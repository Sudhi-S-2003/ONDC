import { v4 as uuidv4 } from "uuid";
// Generate unique transaction and message IDs
const transactionId = uuidv4();
const messageId = uuidv4();

const getUnixTimestamp = () => Math.floor(Date.now() / 1000);
const getISOTimestamp = (unixTimestamp) =>
  new Date(unixTimestamp * 1000).toISOString();
const unixTimestamp = getUnixTimestamp();
const isoTimestamp = getISOTimestamp(unixTimestamp);

console.log("Timestamp (ISO):", isoTimestamp);
console.log("Timestamp (Unix):", unixTimestamp);

const status = {
  context: {
    domain: "ONDC:RET10",
    action: "status",
    country: "IND",
    city: "std:080",
    core_version: "1.2.0",
    bap_id: process.env.BAP_ID,
    bpp_id: "ondcpreprod.sellerapp.in",
    bpp_uri: "https://ondcpreprod.sellerapp.in/bpp/u",
    bap_uri: process.env.BAP_URL,
    transaction_id: "t123",
    message_id: messageId,
    timestamp: isoTimestamp,
    ttl: "PT1M", // Time to live for the message
  },
  message: {
    order_id: "2024-09-20-11111",
  },
};
export default status;
