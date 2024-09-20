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

const select = {
  context: {
    domain: "ONDC:RET10",
    action: "select",
    country: "IND",
    city: "std:080",
    core_version: "1.2.0",
    bap_id: process.env.BAP_ID,
    bpp_id: "ondcpreprod.sellerapp.in",
    bpp_uri: "https://ondcpreprod.sellerapp.in/bpp/u",
    bap_uri: process.env.BAP_URL,
    transaction_id: 't123',
    message_id: messageId,
    timestamp: isoTimestamp,
    ttl: "PT1M", // Time to live for the message
  },
  message: {
    order: {
      items: [
        {
          id: "5b9566b3305b1db6",
          parent_item_id: "3f81a2c18a60c01d",
          quantity: {
            count: 1,
          },
          location_id: "HOMEB-1000",
        },
      ],
      provider: {
        id: "slrp-1355789",
        locations: [
          {
            id: "HOMEB-1000",
          },
        ],
      },
      fulfillments: [
        {
          end: {
            location: {
              gps: "12.970557,77.6448023",
              address: {
                area_code: "560038",
              },
            },
          },
        },
      ],
    },
  },
};
export default select;
