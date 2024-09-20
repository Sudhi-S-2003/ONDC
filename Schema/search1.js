import {isoTimestamp,messageId,transactionId} from '../Unique/id.js'
const search = {
  context: {
    domain: "ONDC:RET12",
    action: "search",
    country: "IND",
    city: "std:020",
    core_version: "1.2.0",
    bap_id: process.env.BAP_ID,
    bap_uri: process.env.BAP_URL,
    bpp_id: "buyer-app-preprod-v2.ondc.org",
    bpp_uri: "https://buyer-app-preprod-v2.ondc.org/protocol/v1",
    transaction_id: "22438715-6ca3-4a1e-8f62-35131665ba2f",
    message_id: "f9517c6d-9247-47a3-8c1b-cb76e1f44752",
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