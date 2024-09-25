import { isoTimestamp, messageId, transactionId } from "../../Unique/id.js";
const cancel = {
  context: {
    domain: "ONDC:RET12",
    action: "cancel",
    country: "IND",
    city: "std:080",
    core_version: "1.2.0",
    bap_id: process.env.BAP_ID,
    bap_uri: process.env.BAP_URL,
    bpp_uri: "https://ondc-mock-server-dev.thewitslab.com/seller",
    bpp_id: "ondc-mock-server-dev.thewitslab.com",
    transaction_id: "23a11106-bbb7-4d7e-ba32-61dcddacfc9e",
    message_id: "8293fcb4-bf04-42dc-a0da-1707fbbe5abf",
    timestamp: isoTimestamp,
    ttl: "PT30S",
  },
  message: {
    order_id: "2024-09-25-10000",
    cancellation_reason_id: "001",
  },
};
export default cancel;
