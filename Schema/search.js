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
const search={
    context: {
        domain: "ONDC:RET10",
        action: "search",
        country: "IND",
        city: "std:080",
        core_version: "1.2.0",
        bap_id: process.env.BAP_ID,
        bap_uri: process.env.BAP_URL,
        bpp_id: "ondcpreprod.sellerapp.in",
        bpp_uri: "https://ondcpreprod.sellerapp.in/bpp/u",
        transaction_id: transactionId,
        message_id: messageId,
        timestamp: isoTimestamp,
        ttl: "P1M", // Time to live for the message
      },
      message: {
        intent: {
          category: {
            id: "Foodgrains",
          },
          fulfillment: {
            type: "Delivery", // Specifies delivery method for retail
          },
          payment: {
            "@ondc/org/buyer_app_finder_fee_type": "percent",
            "@ondc/org/buyer_app_finder_fee_amount": "3",
          },
        },
      },

}
export default search;