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
    // bpp_id: "buyer-app-preprod-v2.ondc.org",
    // bpp_uri: "https://buyer-app-preprod-v2.ondc.org/protocol/v1",
    transaction_id: transactionId,
    message_id: messageId,
    timestamp: isoTimestamp,
    ttl: "PT30S",
  },
  message: {
    intent: {
      item: {
        descriptor: {
          name: "shoe",
        },
      },
      fulfillment: {
        type: "Delivery",
        end: {
          location: {
            gps: "13.0007580000001,77.6165090000001",
          },
        },
      },
      payment: {
        "@ondc/org/buyer_app_finder_fee_type": "percent",
        "@ondc/org/buyer_app_finder_fee_amount": "3.0",
      },
    },
  },
};
export default search;
