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
    bpp_uri: "https://pramaan.ondc.org/alpha/mock-server/seller",
    bpp_id: "pramaan.ondc.org/alpha/mock-server",
    transaction_id: "ff8c47ae-669e-4724-873a-f9d023d8d989",
    message_id: messageId,
    timestamp: isoTimestamp,
    ttl: "PT30S",
  },
  message: {
    order: {
      id: "2024-09-22-100990",
      state: "Created",
      billing: {
        address: {
          name: "Vegulla Arun Kumar",
          building: "SBI Bank",
          locality: "Benguluru",
          city: "Bengaluru",
          state: "Karnataka",
          country: "IND",
          area_code: "560005",
        },
        phone: "7682998943",
        name: "Vegulla Arun Kumar",
        email: "vegullaarun@gmail.com",
        created_at: "2023-03-28T10:48:57.498Z",
        updated_at: "2023-03-28T10:48:57.498Z",
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
          fulfillment_id: "Fulfillment1",
        },
      ],
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
      fulfillments: [
        {
          id: "1",
          tracking: false,
          end: {
            contact: {
              phone: "9886098860",
            },
            person: {
              name: "Vegulla Arun Kumar",
            },
            location: {
              gps: "28.553440, 77.214241",
              address: {
                name: "3rd Cross Road, Vinayaka Layout",
                locality: "3rd Cross Road, Vinayaka Layout",
                city: "Bengaluru",
                state: "Karnataka",
                country: "IND",
                area_code: "110049",
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
          amount: "515.3",
          currency: "INR",
        },
        status: "NOT-PAID",
        type: "ON-FULFILLMENT",
        collected_by: "BPP",
        "@ondc/org/buyer_app_finder_fee_type": "percent",
        "@ondc/org/buyer_app_finder_fee_amount": "3.0",
        "@ondc/org/settlement_details": [
          {
            settlement_counterparty: "seller-app",
            settlement_phase: "sale-amount",
            settlement_type: "neft",
            settlement_bank_account_no: "1000000000",
            settlement_ifsc_code: "SBIN12345",
            beneficiary_name: "Perfect Fit",
            bank_name: "SB",
            branch_name: "CNN",
          },
        ],
      },
      quote: {
        price: {
          currency: "INR",
          value: "515.30",
        },
        breakup: [
          {
            "@ondc/org/item_id": "4a6aca77-bf00-432c-8844-e0068eaa3e65",
            "@ondc/org/item_quantity": {
              count: 0,
            },
            title: "Fusion Shoes",
            "@ondc/org/title_type": "item",
            price: {
              currency: "INR",
              value: "0",
            },
            item: {
              price: {
                currency: "INR",
                value: "2999.00",
              },
            },
          },
          {
            "@ondc/org/item_id": "undefined",
            title: "Delivery charges",
            "@ondc/org/title_type": "delivery",
            price: {
              currency: "INR",
              value: "undefined",
            },
          },
          {
            "@ondc/org/item_id": "undefined",
            title: "Packing charges",
            "@ondc/org/title_type": "packing",
            price: {
              currency: "INR",
              value: "undefined",
            },
          },
          {
            "@ondc/org/item_id": "undefined",
            title: "Convenience Fee",
            "@ondc/org/title_type": "misc",
            price: {
              currency: "INR",
              value: "undefined",
            },
          },
        ],
        ttl: "P1D",
      },
      created_at: isoTimestamp,
      updated_at: isoTimestamp,
    },
  },
};
export default confirm;
