import { isoTimestamp, messageId, transactionId } from "../../Unique/id.js";
const status = {
  context: {
    domain: "ONDC:RET12",
    action: "search",
    country: "IND",
    city: "std:080",
    core_version: "1.2.0",
    bap_id: process.env.BAP_ID,
    bap_uri: process.env.BAP_URL,
    transaction_id: transactionId,
    message_id: messageId,
    timestamp: isoTimestamp,
    ttl: "PT30S",
  },
  message: {
    order_id:"2024-09-22-100990",
  },
};
export default status;
