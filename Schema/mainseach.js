import { v4 as uuidv4 } from "uuid";
 // Generate unique transaction and message IDs
 const transactionId = uuidv4();
 const messageId = uuidv4();
 const getUnixTimestamp = () => Math.floor(Date.now() / 1000);
 const getISOTimestamp = (unixTimestamp) =>
   new Date(unixTimestamp * 1000).toISOString();
 
 // Get the current Unix and ISO timestamps
 const unixTimestamp = getUnixTimestamp();
 const isoTimestamp = getISOTimestamp(unixTimestamp);

 console.log("Timestamp (ISO):", isoTimestamp);
 console.log("Timestamp (Unix):", unixTimestamp);
const mainsearch = {
  context: {
    domain: "nic2004:52110",
    action: "search",
    country: "IND",
    city: "std:080",
    core_version: "1.2.0",
    bap_id: process.env.BAP_ID,
    bap_uri: process.env.BAP_URL,
    transaction_id: transactionId,
    message_id: messageId,
    timestamp: isoTimestamp, 
    ttl: "P1M", 
  },
  message: {
    intent: {
      payment: {
        "@ondc/org/buyer_app_finder_fee_type": "percent",
        "@ondc/org/buyer_app_finder_fee_amount": "6",
      },
    },
  },
};
export default mainsearch;
