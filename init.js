import axios from "axios";
import { createAuthorizationHeader } from "./cryptic.js"; // Adjust import path as needed
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

// Set the ONDC init endpoint
const ONDC_INIT_URL = "https://ondcpreprod.sellerapp.in/bpp/u/select";

const getUnixTimestamp = () => Math.floor(Date.now() / 1000);
const getISOTimestamp = (unixTimestamp) =>
  new Date(unixTimestamp * 1000).toISOString();

const makeInitRequest = async () => {
  try {
    // Generate unique transaction and message IDs
    const transactionId = uuidv4();
    const messageId = uuidv4();

    // Get the current Unix and ISO timestamps
    const unixTimestamp = getUnixTimestamp();
    const isoTimestamp = getISOTimestamp(unixTimestamp);

    console.log("Timestamp (ISO):", isoTimestamp);
    console.log("Timestamp (Unix):", unixTimestamp);

    // Prepare the request payload for the init API call
    const requestPayload = {
      context: {
        domain: "ONDC:RET10",
        action: "init",
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
                count: 1,
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
              id: "524718a7-d186-45bf-9c45-41d8bf3dae75",
              type: "Delivery",
              end: {
                contact: {
                  email: "aavani.sudayan@sellerapp.com",
                  phone: "9400492647",
                },
                location: {
                  gps: "12.970506475401043,77.64712707146829",
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

    // Ensure environment variables are present
    if (!process.env.BAP_ID || !process.env.BAP_URL) {
      throw new Error("Missing BAP_ID or BAP_URL in environment variables");
    }

    // Create the Authorization header using the message part of the payload
    const authorizationHeader = await createAuthorizationHeader(requestPayload);

    // Log the generated Authorization header for debugging
    console.log("Authorization Header:", authorizationHeader);

    // Send the POST request to the ONDC init API
    const response = await axios.post(ONDC_INIT_URL, requestPayload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authorizationHeader,
      },
    });

    // Log the successful response
    console.log("Init response:", response.data);
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

// Execute the init request
makeInitRequest();
