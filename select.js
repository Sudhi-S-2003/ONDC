import axios from "axios";
import { createAuthorizationHeader } from "./cryptic.js"; // Adjust import path as needed
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

// Set the ONDC select endpoint
const ONDC_SELECT_URL = "https://ondcpreprod.sellerapp.in/bpp/u/select";

const getUnixTimestamp = () => Math.floor(Date.now() / 1000);
const getISOTimestamp = (unixTimestamp) =>
  new Date(unixTimestamp * 1000).toISOString();

const makeSelectRequest = async () => {
  try {
    // Generate unique transaction and message IDs
    const transactionId = uuidv4();
    const messageId = uuidv4();

    // Get the current Unix and ISO timestamps
    const unixTimestamp = getUnixTimestamp();
    const isoTimestamp = getISOTimestamp(unixTimestamp);

    console.log("Timestamp (ISO):", isoTimestamp);
    console.log("Timestamp (Unix):", unixTimestamp);

    // Prepare the request payload with the specific item data
    const requestPayload = {
      context: {
        domain: "ONDC:RET10",
        action: "select",
        country: "IND",
        city: "std:080",
        core_version: "1.2.0",
        bap_id: process.env.BAP_ID,
        bpp_id: "ondcpreprod.sellerapp.in",
        bpp_uri: "https://ondcpreprod.sellerapp.in/bpp/u",
        bap_uri: process.env.BAP_URL,
        transaction_id: transactionId,
        message_id: messageId,
        timestamp: isoTimestamp,
        ttl: "PT1M", // Time to live for the message
      },
      message: {
        order: {
          items: [
            {
              id: "5b9566b3305b1db6",
              parent_item_id: "3f81a2c18a60c01d",
              quantity: {
                count: 1,
              },
              location_id: "HOMEB-1000",
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
              end: {
                location: {
                  gps: "12.970557,77.6448023",
                  address: {
                    area_code: "560038",
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
      throw new Error(
        "Missing BAP_ID, BAP_URL, BPP_ID or BPP_URL in environment variables"
      );
    }

    // Create the Authorization header using the message part of the payload
    const authorizationHeader = await createAuthorizationHeader(requestPayload);

    // Log the generated Authorization header for debugging
    console.log("Authorization Header:", authorizationHeader);

    // Send the POST request to the ONDC select API
    const response = await axios.post(ONDC_SELECT_URL, requestPayload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authorizationHeader,
        "X-Gateway-Authorization": authorizationHeader,
      },
    });

    // Log the successful response
    console.log("Select response:", response.data);
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

// Execute the select request
makeSelectRequest();
