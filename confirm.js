import axios from "axios";
import { createAuthorizationHeader } from "./cryptic.js"; // Adjust import path as needed
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

// Set the ONDC confirm endpoint
const ONDC_CONFIRM_URL = "https://ondcpreprod.sellerapp.in/bpp/u/confirm";

const getUnixTimestamp = () => Math.floor(Date.now() / 1000);
const getISOTimestamp = (unixTimestamp) =>
  new Date(unixTimestamp * 1000).toISOString();

const makeConfirmRequest = async () => {
  try {
    // Generate unique transaction and message IDs
    const transactionId = uuidv4();
    const messageId = uuidv4();

    // Get the current Unix and ISO timestamps
    const unixTimestamp = getUnixTimestamp();
    const isoTimestamp = getISOTimestamp(unixTimestamp);

    console.log("Timestamp (ISO):", isoTimestamp);
    console.log("Timestamp (Unix):", unixTimestamp);

    // Prepare the request payload for the confirm API call
    const requestPayload = {
      context: {
        domain: "ONDC:RET10",
        action: "confirm",
        core_version: "1.2.0",
        bap_id: process.env.BAP_ID,
        bap_uri: process.env.BAP_URL,
        bpp_id: "ondcpreprod.sellerapp.in",
        bpp_uri: "https://ondcpreprod.sellerapp.in/bpp/u",
        transaction_id: "t123",
        message_id: messageId,
        city: "std:080",
        country: "IND",
        timestamp: isoTimestamp,
        ttl: "P1M",
      },
      message: {
        order: {
          id: "2024-09-10-20",
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
            created_at: "2024-09-20T14:12:33.615Z",
            updated_at: "2024-09-20T14:12:33.615Z",
          },
          items: [
            {
              id: "5b9566b3305b1db6",
              quantity: {
                count: 1,
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
              id: "524718a7-d186-45bf-9c45-41d8bf3dae75",
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
                  gps: "12.970506475401043,77.64712707146829",
                  address: {
                    name: "Aavani S Udayan",
                    building: "San Jose",
                    locality: "12th Main Road",
                    city: "Bengaluru",
                    state: "Karnataka",
                    country: "IND",
                    area_code: "560038",
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
              transaction_id: "ade3cb1c-8cb1-4f17-8112-3777210ab0d6",
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
                settlement_bank_account_no: "115022700000022",
                settlement_ifsc_code: "YESB0000001",
                beneficiary_name: "SELLMETRIC YPP COLLECTION ACCOUNT",
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
                  count: 1,
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
                  value: "29ABDCS3411L1Z7",
                },
                {
                  code: "provider_tax_number",
                  value: "2w354df6g",
                },
              ],
            },
          ],
        },
      },
    };

    // Ensure environment variables are present
    if (!process.env.BAP_ID || !process.env.BAP_URL) {
      throw new Error("Missing BAP_ID or BAP_URL in environment variables");
    }

    // Create the Authorization header using the message part of the payload
    const authorizationHeader = await createAuthorizationHeader(requestPayload);

    // Log the generated Authorization header for debugging
    console.log("Authorization Header:", authorizationHeader);

    // Send the POST request to the ONDC confirm API
    const response = await axios.post(ONDC_CONFIRM_URL, requestPayload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authorizationHeader,
        "X-Gateway-Authorization": authorizationHeader,
      },
    });

    // Log the successful response
    console.log("Confirm response:", response.data);
  } catch (error) {
    if (error.response) {
      // Handle errors returned from the API
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      console.error("Error response headers:", error.response.headers);
    } else {
      // Handle other types of errors (e.g., network issues)
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
  }
};

// Execute the confirm request
makeConfirmRequest();
