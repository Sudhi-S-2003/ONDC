import _sodium from "libsodium-wrappers";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Function to create a signing string based on ONDC requirements
export const createSigningString = async (message, created, expires) => {
  await _sodium.ready;
  const sodium = _sodium;

  if (!created) created = Math.floor(Date.now() / 1000).toString();
  if (!expires) expires = (parseInt(created) + (1 * 60 * 60)).toString(); // 1-hour expiry

  // Hash the message using BLAKE2b (should be only message part of the payload)
  const digest = sodium.crypto_generichash(64, sodium.from_string(message));
  const digest_base64 = sodium.to_base64(
    digest,
    sodium.base64_variants.ORIGINAL
  );

  // Create the signing string
  const signing_string = `(created): ${created}\n(expires): ${expires}\ndigest:BLAKE2b=${digest_base64}`;

  return { signing_string, created, expires };
};


// Function to sign the message using ed25519 and the private key
export const signMessage = async (signing_string, privateKey) => {
  await _sodium.ready;
  const sodium = _sodium;

  // Sign the signing_string with the provided privateKey using ed25519
  const signedMessage = sodium.crypto_sign_detached(
    sodium.from_string(signing_string),
    sodium.from_base64(privateKey, sodium.base64_variants.ORIGINAL) // Decode private key
  );

  return sodium.to_base64(signedMessage, sodium.base64_variants.ORIGINAL);
};


// Function to create the ONDC-compliant Authorization header
export const createAuthorizationHeader = async (message) => {
  const { signing_string, created, expires } = await createSigningString(
    JSON.stringify(message) // Make sure to hash only the message part
  );

  const privateKey = process.env.BAP_PRIVATE_KEY;
  const signature = await signMessage(signing_string, privateKey);

  const subscriber_id = process.env.BAP_ID;
  const unique_key_id = process.env.BAP_UNIQUE_KEY_ID;

  const header = `Signature keyId="${subscriber_id}|${unique_key_id}|ed25519",algorithm="ed25519",created="${created}",expires="${expires}",headers="(created) (expires) digest",signature="${signature}"`;

  return header;
};

