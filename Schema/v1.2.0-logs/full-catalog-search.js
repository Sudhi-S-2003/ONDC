import { isoTimestamp, messageId, transactionId } from "../../Unique/id.js";
const search = {
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
export default search;
