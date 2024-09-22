import { isoTimestamp, messageId, transactionId } from "../../Unique/id.js";
const init = {
  context: {
    domain: "ONDC:RET12",
    action: "init",
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
    order: {
      provider: {
        id: "pramaan.ondc.org/alpha/mock-server",
        locations: [
            {
              id: "f13873c1-810d-4f2b-ba54-5edcec9f0e4a",
              gps: "28.553440, 77.214241",
              address: {
                street: "7/6, August Kranti Marg",
                locality: "Siri Fort Institutional Area, Siri Fort",
                city: "New Delhi",
                state: "Delhi",
                area_code: "110049",
              },
              circle: {
                gps: "30.745554,76.653711",
                radius: {
                  unit: "km",
                  value: "10",
                },
              },
            },
          ], 
      },
      items: [
        {
          id: "4a6aca77-bf00-432c-8844-e0068eaa3e65",

          quantity: {
            unitized: {
              measure: {
                unit: "unit",
                value: "2",
              },
            },
          },
          location_id: "f13873c1-810d-4f2b-ba54-5edcec9f0e4a",
        },
      ],
      billing: {
        address: {
          building: "SBI Bank",
          city: "Bengaluru",
          state: "Karnataka",
          country: "IND",
          area_code: "560005",
          locality: "Benguluru",
          name: "Vegulla Arun Kumar",
        },
        phone: "7682998943",
        name: "Vegulla Arun Kumar",
        email: "vegullaarun@gmail.com",
        created_at: "2023-03-28T10:48:57.498Z",
        updated_at: "2023-03-28T10:48:57.498Z",
      },
      fulfillments: [
        {
          id: "Fulfillment1",
          type: "Delivery",
          end: {
            contact: {
              email: "vegullaarun@gmail.com",
              phone: "7682998943",
            },
            location: {
                gps: "28.553440, 77.214241",
                address: {
                name: "Vegulla Arun Kumar",
                building: "SBI Bank",
                locality: "Benguluru",
                ward: null,
                city: "Bengaluru",
                state: "Karnataka",
                country: "IND",
                area_code: "560005",
              },
            },
          },
        },
      ],
    },
  },
};
export default init;
