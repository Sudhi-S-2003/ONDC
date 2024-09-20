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

const init = {
  context: {
    domain: "ONDC:RET10",
    action: "init",
    country: "IND",
    city: "std:080",
    core_version: "1.2.0",
    bap_id: process.env.BAP_ID,
    bpp_id: "ondcpreprod.sellerapp.in",
    bpp_uri: "https://ondcpreprod.sellerapp.in/bpp/u",
    bap_uri: process.env.BAP_URL,
    transaction_id: "t123",
    message_id: messageId,
    timestamp: isoTimestamp,
    ttl: "PT1M", // Time to live for the message
  },
  message: {
    order: {
      provider: {
        id: "slrp-1355789",
        locations: [
          {
            id: "HOMEB-1000",
          },
        ],
      },
      items: [
        {
          id: "5b9566b3305b1db6",
          quantity: {
            count: 2,
          },
          location_id: "HOMEB-1000",
          fulfillment_id: "34f3e0ca-8113-47d4-980a-1a6ad5426ca4",
        },
      ],
      billing: {
        address: {
          building: "San Jose",
          city: "Bengaluru",
          state: "Karnataka",
          country: "IND",
          area_code: "560038",
          locality: "12th Main Road",
          name: "Aavani S Udayan",
        },
        phone: "9400492647",
        name: "Aavani S Udayan",
        email: "aavani.sudayan@sellerapp.com",
        
      },

      
      fulfillments: [
        {
          id: "32f118a0-16be-4763-8c2b-88e05909d9d9",
          type: "Delivery",
          end: {
            contact: {
              email: "aavani.sudayan@sellerapp.com",
              phone: "9400492647",
            },
            location: {
              gps: "12.970557,77.6448023",
              address: {
                building: "San Jose",
                city: "Bengaluru",
                state: "Karnataka",
                country: "IND",
                area_code: "560038",
                locality: "12th Main Road",
                name: "Aavani S Udayan",
              },
            },
          },
        },
      ],
    },
  },
};
export default init;
