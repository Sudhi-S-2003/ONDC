import axios from "axios";
import { createAuthorizationHeader } from "./cryptic.js"; // Adjust import path as needed
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

// Set the ONDC init endpoint
const ONDC_INIT_URL = "https://ondcsellerapp.revalsys.com/api/ondc/init";

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
        domain: "ONDC:RET11",
        action: "init",
        core_version: "1.2.0",
        bap_id: process.env.BAP_ID,
        bap_uri: process.env.BAP_URL,
        bpp_id: "ondcsellerapp.revalsys.com",
        bpp_uri: "https://ondcsellerapp.revalsys.com/api/ondc",
        transaction_id: "de4c41b1-5719-4875-8b7c-027deb961c84'",
        message_id: messageId,
        city: "std:080",
        country: "IND",
        timestamp: isoTimestamp,
        ttl: "P1M",
      },
      message: {
        order: {
          provider: { id: "wsi", locations: [{ id: "RL1" }] },
          items: [
            {
              fulfillment_id: "F1",
              id: "wsi|0F81B74E-485F-4505-9E43-977DD18188DC",
            },
          ],
          billing: {
            name: "John Doe",
            address: {
              door: "123",
              building: "ABC Apartments",
              street: "MG Road",
              city: "Bangalore",
              state: "Karnataka",
              country: "IND",
              area_code: "560001",
            },
            phone: "9876543210",
            email: "johndoe@example.com",
          },
          fulfillments: [
            {
              id: "F1",
              "@ondc/org/provider_name": "wsi",
              tracking: false,
              "@ondc/org/category": "Immediate Delivery",
              "@ondc/org/TAT": "PT45M",
              state: [{ descriptor: { code: "Serviceable" } }],
              type: "Delivery",
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
