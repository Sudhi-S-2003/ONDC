import _sodium from "libsodium-wrappers";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

// Function to create the signing string
export const createSigningString = async (message, created, expires) => {
  if (!created) created = Math.floor(new Date().getTime() / 1000).toString();
  if (!expires) expires = (parseInt(created) + 1 * 60 * 60).toString();

  await _sodium.ready;

  const sodium = _sodium;
  const digest = sodium.crypto_generichash(64, sodium.from_string(message));
  const digest_base64 = sodium.to_base64(
    digest,
    _sodium.base64_variants.ORIGINAL
  );

  const signing_string = `(created): ${created}
(expires): ${expires}
digest: BLAKE-512=${digest_base64}`;

  return { signing_string, created, expires };
};

// Function to sign the message
export const signMessage = async (signing_string, privateKey) => {
  await _sodium.ready;
  const sodium = _sodium;

  try {
    const signedMessage = sodium.crypto_sign_detached(
      signing_string,
      sodium.from_base64(privateKey, _sodium.base64_variants.ORIGINAL)
    );
    return sodium.to_base64(signedMessage, _sodium.base64_variants.ORIGINAL);
  } catch (error) {
    console.error("Error signing message:", error);
    throw new Error("Error signing message");
  }
};

// Function to create the Authorization header
export const createAuthorizationHeader = async (message) => {
  if (
    !process.env.BAP_PRIVATE_KEY ||
    !process.env.BAP_ID ||
    !process.env.BAP_UNIQUE_KEY_ID
  ) {
    throw new Error("Missing required environment variables");
  }

  const { signing_string, expires, created } = await createSigningString(
    JSON.stringify(message)
  );

  const signature = await signMessage(
    signing_string,
    process.env.BAP_PRIVATE_KEY
  );

  const subscriber_id = process.env.BAP_ID;
  const unique_key_id = process.env.BAP_UNIQUE_KEY_ID;
  const header = `Signature keyId="${subscriber_id}|${unique_key_id}|ed25519",algorithm="ed25519",created="${created}",expires="${expires}",headers="(created) (expires) digest",signature="${signature}"`;

  return header;
};

// Function to create a key pair
export const createKeyPair = async () => {
  await _sodium.ready;
  const sodium = _sodium;

  try {
    const { publicKey, privateKey } = sodium.crypto_sign_keypair();
    const publicKey_base64 = sodium.to_base64(
      publicKey,
      _sodium.base64_variants.ORIGINAL
    );
    const privateKey_base64 = sodium.to_base64(
      privateKey,
      _sodium.base64_variants.ORIGINAL
    );

    return { publicKey: publicKey_base64, privateKey: privateKey_base64 };
  } catch (error) {
    console.error("Error creating key pair:", error);
    throw new Error("Error creating key pair");
  }
};

// Function to get the provider public key
const getProviderPublicKey = async (providers, keyId) => {
  try {
    const provider = _.find(providers, ["ukId", keyId]);
    return provider?.signing_public_key || false;
  } catch (error) {
    console.error("Error getting provider public key:", error);
    return false;
  }
};

// Function to look up the registry
export const lookupRegistry = async (subscriber_id, unique_key_id) => {
  try {
    const response = {
      subscriber_id: "ondc.eatiko.com",
      status: "SUBSCRIBED",
      ukId: "72065a60-1c89-4247-bf57-7b4bee17e4cd",
      subscriber_url: "https://ondc.eatiko.com/bapl",
      country: "IND",
      domain: "nic2004:52110",
      valid_from: "2024-01-01T00:00:00.000Z",
      valid_until: "2024-12-31T23:59:59.999Z",
      type: "BAP",
      signing_public_key: "rho4+KyAH9t0yPvI7h1dtL7eZS1NkwFMfgfumG8hFTw=",
      encr_public_key:
        "MCowBQYDK2VuAyEAnoyoQnWs6uQHvV1TN3Z0vHgLOIWGWO/cgeIgENYOCH4=",
      created: "2024-09-18T13:57:26.477Z",
      updated: "2024-09-18T13:57:26.477Z",
      br_id: "72065a60-1c89-4247-bf57-7b4bee17e4cd",
      city: "std:080",
    };

    if (!response) {
      return false;
    }

    const public_key = await getProviderPublicKey(response, unique_key_id);

    if (!public_key) return false;

    return public_key;
  } catch (error) {
    console.error("Error looking up registry:", error);
    return false;
  }
};

// Function to remove quotes from a string
const removeQuotes = (a) => a.replace(/^["'](.+(?=["']$))["']$/, "$1");

// Function to split the authorization header into its components
export const splitAuthHeader = (auth_header) => {
  const header = auth_header.replace("Signature ", "");
  const re = /\s*([^=]+)=([^,]+)[,]?/g;
  let m;
  const parts = {};
  while ((m = re.exec(header)) !== null) {
    if (m) {
      parts[m[1]] = removeQuotes(m[2]);
    }
  }
  return parts;
};

// Function to verify the message
const verifyMessage = async (signedString, signingString, publicKey) => {
  try {
    await _sodium.ready;
    const sodium = _sodium;
    return sodium.crypto_sign_verify_detached(
      sodium.from_base64(signedString, _sodium.base64_variants.ORIGINAL),
      signingString,
      sodium.from_base64(publicKey, _sodium.base64_variants.ORIGINAL)
    );
  } catch (error) {
    console.error("Error verifying message:", error);
    return false;
  }
};

// Function to verify the header// Function to verify the header
export const verifyHeader = async (headerParts, body, public_key) => {
  try {
    const { signing_string } = await createSigningString(
      JSON.stringify(body),
      headerParts["created"],
      headerParts["expires"]
    );
    const verified = await verifyMessage(
      headerParts["signature"],
      signing_string,
      public_key
    );
    return verified;
  } catch (error) {
    console.error("Error verifying header:", error);
    return false;
  }
};

// Function to check if the signature is valid
export const isSignatureValid = async (header, body) => {
  try {
    const headerParts = splitAuthHeader(header);
    const keyIdSplit = headerParts["keyId"].split("|");
    const subscriber_id = keyIdSplit[0];
    const keyId = keyIdSplit[1];
    const public_key = await lookupRegistry(subscriber_id, keyId);

    if (!public_key) {
      console.error("Public key not found");
      return false;
    }

    return await verifyHeader(headerParts, body, public_key);
  } catch (error) {
    console.error("Error validating signature:", error);
    return false;
  }
};

// Function to sign a registry request
export const signRegistryRequest = async (request) => {
  const reqObj = [];

  if (request.country) reqObj.push(request.country);
  if (request.domain) reqObj.push(request.domain);
  if (request.type) reqObj.push(request.type);
  if (request.city) reqObj.push(request.city);
  if (request.subscriber_id) reqObj.push(request.subscriber_id);

  const signingString = reqObj.join("|");
  try {
    return await signMessage(signingString, process.env.BAP_PRIVATE_KEY || "");
  } catch (error) {
    console.error("Error signing registry request:", error);
    throw new Error("Error signing registry request");
  }
};

// Function to format a registry request
export const formatRegistryRequest = async (request) => {
  try {
    const signature = await signRegistryRequest(request);

    return {
      sender_subscriber_id: process.env.BAP_ID,
      request_id: uuidv4(),
      timestamp: new Date().toISOString(),
      search_parameters: {
        ...request,
      },
      signature: signature,
    };
  } catch (error) {
    console.error("Error formatting registry request:", error);
    throw new Error("Error formatting registry request");
  }
};
