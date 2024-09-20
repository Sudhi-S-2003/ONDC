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

const confirm = {
  context: {
    domain: "ONDC:RET10",
    action: "confirm",
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
      id: "2024-09-20-11111",
      state: "Created",
      billing: {
        address: {
          name: "Aavani S Udayan",
          building: "San Jose",
          locality: "12th Main Road",
          city: "Bengaluru",
          state: "Karnataka",
          country: "IND",
          area_code: "560038",
        },
        phone: "9400492647",
        name: "Aavani S Udayan",
        
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
          id: "32f118a0-16be-4763-8c2b-88e05909d9d9",
          tracking: false,
          end: {
            contact: {
              email: "aavani.sudayan@sellerapp.com",
              phone: "9400492647",
            },
            person: {
              name: "Aavani S Udayan",
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
          type: "Delivery",
        },
      ],
      payment: {
        uri: "https://juspay.in/",
        tl_method: "http/get",
        params: {
          amount: "369",
          currency: "INR",
          transaction_id: "c5e5ea2a-f0d6-4fe9-bb89-294a43da332e",
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
            settlement_bank_account_no: "272305001134",
            settlement_ifsc_code: "ICIC0002723",
            beneficiary_name: "SELLMETRIC PRIVATE LIMITED",
          },
        ],
      },
      quote: {
        price: {
          currency: "INR",
          value: "369",
        },
        breakup: [
          {
            title: "Homemade Love Khatta Meetha Lemon Pickle -250g",
            price: {
              currency: "INR",
              value: "299",
            },
            "@ondc/org/item_id": "5b9566b3305b1db6",
            "@ondc/org/item_quantity": {
              count: 2,
            },
            "@ondc/org/title_type": "item",
            item: {
              price: {
                currency: "INR",
                value: "299",
              },
            },
          },
          {
            title: "Delivery charges",
            price: {
              currency: "INR",
              value: "70",
            },
            "@ondc/org/item_id": "fedcfbb6-9ca0-4f0b-a3ba-38f35aae0710",
            "@ondc/org/title_type": "delivery",
          },
        ],
        ttl: "PT5M",
      },
      tags: [
        {
          code: "bpp_terms",
          list: [
            {
              code: "tax_number",
              value: "27AAACJN1234A1ZP",
            },
          ],
        },
        {
          code: "bap_terms",
          list: [
            {
              code: "tax_number",
              value: "BUYER-APP-GSTN-ONDC",
            },
          ],
        },
      ],
      created_at: "2024-09-20T17:25:41.581Z",
      updated_at: "2024-01-05T17:25:41.581Z",
    },
  },
};
export default confirm;
