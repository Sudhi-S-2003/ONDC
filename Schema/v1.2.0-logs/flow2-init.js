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
    transaction_id: transactionId,
    message_id: messageId,
    timestamp: isoTimestamp,
    ttl: "PT30S",
  },
  message: {
    order: {
      provider: {
        id: "pramaan.ondc.org/alpha/mock-server",

        locations: [
          {
            id: "f13873c1-810d-4f2b-ba54-5edcec9f0e4a",
          },
        ],
      },
      items: [
        {
          id: "fe3467e7-2104-46f3-9acf-10a65b0ad75d",
          quantity: {
            count: 4,
          },
          location_id: "f13873c1-810d-4f2b-ba54-5edcec9f0e4a",
          fulfillment_id: "0a4a6c37-7622-46b9-a501-2b48527f4a3e",
        },
        {
          id: "903b94ab-7605-4dd4-b0ff-d9ac92d3dd0e",
          quantity: {
            count: 3,
          },
          location_id: "f13873c1-810d-4f2b-ba54-5edcec9f0e4a",
          fulfillment_id: "0a4a6c37-7622-46b9-a501-2b48527f4a3e",
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
