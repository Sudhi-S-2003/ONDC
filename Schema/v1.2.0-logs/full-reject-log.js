import { isoTimestamp, messageId, transactionId } from "../../Unique/id.js";
const catalog_rejection = {
  context: {
    domain: "ONDC:RET12",
    action: "search",
    country: "IND",
    city: "std:033",
    core_version: "1.2.0",
    bap_id: process.env.BAP_ID,
    bap_uri: process.env.BAP_URL,
 
    transaction_id: "23a11106-bbb7-4d7e-ba32-61dcddacfc9e",
    message_id: "8293fcb4-bf04-42dc-a0da-1707fbbe5abf",
    timestamp: isoTimestamp,
    ttl: "PT30S",
  },
  message: {
    intent: {
      fulfillment: {
        type: "Delivery",
      },
      payment: {
        "@ondc/org/buyer_app_finder_fee_type": "percent",
        "@ondc/org/buyer_app_finder_fee_amount": "3",
      },
    },
  },
};
export default catalog_rejection;
