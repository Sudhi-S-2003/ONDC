import { isoTimestamp, messageId, transactionId } from "../../Unique/id.js";
const status = {
  context: {
    domain: "ONDC:RET12",
    action: "status",
    country: "IND",
    city: "std:080",
    core_version: "1.2.0",
    bap_id: process.env.BAP_ID,
    bap_uri: process.env.BAP_URL,
    bpp_uri: "https://pramaan.ondc.org/alpha/mock-server/seller",
    bpp_id: "pramaan.ondc.org/alpha/mock-server",
    transaction_id: "ff8c47ae-669e-4724-873a-f9d023d8d989",
    message_id: messageId,
    timestamp: isoTimestamp,
    ttl: "PT30S",
  },
  message: {
    order_id:"2024-09-22-100990",
  },
};
export default status;
