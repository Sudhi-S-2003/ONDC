import { isoTimestamp, messageId, transactionId } from "../../Unique/id.js";
const select = {
  context: {
    domain: "ONDC:RET12",
    action: "select",
    country: "IND",
    city: "std:080",
    core_version: "1.2.0",
    bap_id: process.env.BAP_ID,
    bap_uri: process.env.BAP_URL,
    bpp_uri: "https://ondc-mock-server-dev.thewitslab.com/seller",
    bpp_id: "ondc-mock-server-dev.thewitslab.com",
    transaction_id: transactionId,
    message_id: messageId,
    timestamp: isoTimestamp,
    ttl: "PT30S",
  },
  message: {
    order: {
      items: [
        {
          id: "4a6aca77-bf00-432c-8844-e0068eaa3e65",
          quantity: {
            count: 4,
          },
          location_id: "f13873c1-810d-4f2b-ba54-5edcec9f0e4a",
        },
        {
          id: "6fa942d6-3137-48b6-9fb9-4a3b26937b34",
          quantity: {
            count: 3,
          },
          location_id: "f13873c1-810d-4f2b-ba54-5edcec9f0e4a",
        },
      ],
      provider: {
        id: "ondc-mock-server-dev.thewitslab.com",

        locations: [
          {
            id: "f13873c1-810d-4f2b-ba54-5edcec9f0e4a",
          },
        ],
      },
      fulfillments: [
        {
          end: {
            location: {
              gps: "28.553440, 77.214241",
              address: {
                area_code: "110049",
              },
            },
          },
        },
      ],
    },
  },
};
export default select;
