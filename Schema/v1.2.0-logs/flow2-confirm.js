import { isoTimestamp, messageId, transactionId } from "../../Unique/id.js";
const confirm = {
  context: {
    domain: "ONDC:RET12",
    action: "confirm",
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
      id: "2024-09-25-10000",
      state: "Created",
      billing: {
        address: {
          name: "Shippu Yadav",
          building: "Korulur Village",
          locality: "Gandhi Marg",
          city: "Bengaluru",
          state: "Karnataka",
          country: "IND",
          area_code: "560056",
        },
        phone: "8368922474",
        name: "Shippu Yadav",
        email: "shippu.yadav@ens.enterprises",
        created_at: "2023-12-18T16:24:23.056Z",
        updated_at: "2023-12-18T16:24:23.056Z",
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
          id: "0a4a6c37-7622-46b9-a501-2b48527f4a3e",
          tracking: false,
          end: {
            contact: {
              email: "shippu.yadav@ens.enterprises",
              phone: "8368922474",
            },
            person: {
              name: "Shippu Yadav",
            },
            location: {
              gps: "12.950055071252017, 77.50174999226148",
              address: {
                name: "Shippu Yadav",
                building: "Korulur Village",
                locality: "Gandhi Marg",
                city: "Bengaluru",
                state: "Karnataka",
                country: "IND",
                area_code: "560056",
              },
            },
          },
          type: "Delivery",
        },
      ],
      payment: {
        uri: "https://juspay.in/",
        tl_method: "http/get",
        params: {
          amount: "1360",
          currency: "INR",
          transaction_id: "e6e51d5f-88fa-4896-b6b1-4f991abdb278",
        },
        status: "PAID",
        type: "ON-ORDER",
        collected_by: "BAP",
        "@ondc/org/buyer_app_finder_fee_type": "percent",
        "@ondc/org/buyer_app_finder_fee_amount": "3.0",
        "@ondc/org/settlement_details": [
          {
            settlement_counterparty: "seller-app",
            settlement_phase: "sale-amount",
            settlement_type: "neft",
            upi_address: "hul@kiosk",
            settlement_bank_account_no: "623905034810",
            settlement_ifsc_code: "ICIC0006239",
            beneficiary_name: "JHAKAAS RETAIL PRIVATE LIMITED",
            bank_name: "ICICI BANK",
            branch_name: "Mumbai Chembur branch",
          },
        ],
      },
      quote: {
        price: {
          currency: "INR",
          value: "21114.00",
        },
        breakup: [
          {
            "@ondc/org/item_id": "4a6aca77-bf00-432c-8844-e0068eaa3e65",
            "@ondc/org/item_quantity": {
              count: 4,
            },
            title: "Fusion Shoes",
            "@ondc/org/title_type": "item",
            price: {
              currency: "INR",
              value: "11996.00",
            },
            item: {
              quantity: {
                available: {
                  count: "99",
                },
                maximum: {
                  count: "99",
                },
              },
              price: {
                currency: "INR",
                value: "2999.00",
              },
            },
          },
          {
            "@ondc/org/item_id": "c461a827-f43d-487e-871d-e13467acd866",
            title: "Delivery charges",
            "@ondc/org/title_type": "delivery",
            price: {
              currency: "INR",
              value: "50.00",
            },
          },
          {
            "@ondc/org/item_id": "c461a827-f43d-487e-871d-e13467acd866",
            title: "Packing charges",
            "@ondc/org/title_type": "packing",
            price: {
              currency: "INR",
              value: "25.00",
            },
          },
          {
            "@ondc/org/item_id": "c461a827-f43d-487e-871d-e13467acd866",
            title: "Convenience Fee",
            "@ondc/org/title_type": "misc",
            price: {
              currency: "INR",
              value: "10.00",
            },
          },
          {
            "@ondc/org/item_id": "c461a827-f43d-487e-871d-e13467acd866",
            title: "Tax",
            "@ondc/org/title_type": "tax",
            price: {
              currency: "INR",
              value: "11.00",
            },
            item: {
              tags: [
                {
                  code: "quote",
                  list: [
                    {
                      code: "type",
                      value: "fulfillment",
                    },
                  ],
                },
              ],
            },
          },
          {
            "@ondc/org/item_id": "56d0f31d-20c9-4fe2-86c2-a6091af81df9",
            title: "Delivery charges",
            "@ondc/org/title_type": "delivery",
            price: {
              currency: "INR",
              value: "0.00",
            },
          },
          {
            "@ondc/org/item_id": "56d0f31d-20c9-4fe2-86c2-a6091af81df9",
            title: "Packing charges",
            "@ondc/org/title_type": "packing",
            price: {
              currency: "INR",
              value: "25.00",
            },
          },
          {
            "@ondc/org/item_id": "6fa942d6-3137-48b6-9fb9-4a3b26937b34",
            "@ondc/org/item_quantity": {
              count: 3,
            },
            title: "Variant Shoes",
            "@ondc/org/title_type": "item",
            price: {
              currency: "INR",
              value: "8997.00",
            },
            item: {
              quantity: {
                available: {
                  count: "99",
                },
                maximum: {
                  count: "99",
                },
              },
              price: {
                currency: "INR",
                value: "2999.00",
              },
            },
          },
        ],
        created_at: isoTimestamp,
        updated_at: isoTimestamp,
      },
    },
  },
};
export default confirm;
