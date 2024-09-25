import { isoTimestamp, messageId, transactionId } from "../../Unique/id.js";
const search = {
  context: {
    domain: "ONDC:RET12",
    action: "init",
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
    order: {
      provider: {
        id: "ondc-mock-server-dev.thewitslab.com",
        locations: [
          {
            id: "f13873c1-810d-4f2b-ba54-5edcec9f0e4a",
          },
        ],
      },
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
      billing: {
        address: {
          building: "Korulur Village",
          city: "Bengaluru",
          state: "Karnataka",
          country: "IND",
          area_code: "560056",
          locality: "Gandhi Marg",
          name: "Shippu Yadav",
        },
        phone: "8368922474",
        name: "Shippu Yadav",
        email: "shippu.yadav@ens.enterprises",
        created_at: "2023-12-18T16:24:23.056Z",
        updated_at: "2023-12-18T16:24:23.056Z",
      },
      fulfillments: [
        {
          id: "0a4a6c37-7622-46b9-a501-2b48527f4a3e",
          type: "Delivery",
          end: {
            contact: {
              email: "shippu.yadav@ens.enterprises",
              phone: "8368922474",
            },
            location: {
              gps: "28.553440, 77.214241",
              address: {
                building: "Korulur Village",
                city: "Bengaluru",
                state: "Karnataka",
                country: "IND",
                area_code: "110049",
                locality: "Gandhi Marg",
                name: "Shippu Yadav",
              },
            },
          },
        },
      ],
    },
  },
};
export default search;
