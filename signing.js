import _sodium from "libsodium-wrappers";
import dotenv from "dotenv";

dotenv.config();

export const createSigningString = async (message, created, expires) => {
  await _sodium.ready;
  const sodium = _sodium;

  // Default to current timestamp if not provided
  if (!created) created = Math.floor(Date.now() / 1000).toString();
  if (!expires) expires = (parseInt(created) + (1 * 60 * 60)).toString();
  console.log("diff:",expires-created)

  // Hash the message using BLAKE2b
  const digest = sodium.crypto_generichash(64, sodium.from_string(message));
  const digest_base64 = sodium.to_base64(digest, sodium.base64_variants.ORIGINAL);

  // Create the signing string as per the required format
  const signing_string = `(created): ${created}\n(expires): ${expires}\ndigest:BLAKE2b=${digest_base64}`;

  console.log("Signing String:", signing_string); // Debugging

  return { signing_string, created, expires };
};

export const signMessage = async (signing_string, privateKey) => {
  await _sodium.ready;
  const sodium = _sodium;

  // Sign the signing_string with the privateKey using ed25519
  const signedMessage = sodium.crypto_sign_detached(
    // sodium.from_string(signing_string),
    signing_string,
    sodium.from_base64(privateKey, sodium.base64_variants.ORIGINAL)
  );

  // Return the base64-encoded signature
  return sodium.to_base64(signedMessage, sodium.base64_variants.ORIGINAL);
};

export const createAuthorizationHeader = async (message) => {
  const { signing_string, created, expires } = await createSigningString(
    JSON.stringify(message)
  );

  const privateKey = process.env.BAP_PRIVATE_KEY;
  if (!privateKey) throw new Error("Private key not provided");

  // Sign the signing string
  const signature = await signMessage(signing_string, privateKey);

  const subscriber_id = process.env.BAP_ID;
  const unique_key_id = process.env.BAP_UNIQUE_KEY_ID;

  if (!subscriber_id || !unique_key_id) {
    throw new Error("BAP_ID or BAP_UNIQUE_KEY_ID is missing");
  }

  // Build the Authorization header
  const header = `Signature keyId="${subscriber_id}|${unique_key_id}|ed25519",algorithm="ed25519",created="${created}",expires="${expires}",headers="(created) (expires) digest",signature="${signature}"`;

  console.log("Authorization Header:", header); // Debugging

  return header;
};
