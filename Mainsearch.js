import axios from "axios";
import { createAuthorizationHeader } from "./signing.js"; // Adjust import path as needed
import { v4 as uuidv4 } from "uuid"; // To generate unique IDs
import dotenv from "dotenv";

dotenv.config();

const ONDC_SEARCH_URL = "https://staging.gateway.proteantech.in/search";

// Helper function to get current timestamp in Unix format and ISO 8601
const getUnixTimestamp = () => Math.floor(Date.now() / 1000);
const getISOTimestamp = (unixTimestamp) =>
  new Date(unixTimestamp * 1000).toISOString();

const makeSearchRequest = async () => {
  try {
    // Generate unique transaction and message IDs
    const transactionId = uuidv4();
    const messageId = uuidv4();

    // Get the current Unix and ISO timestamps
    const unixTimestamp = getUnixTimestamp();
    const isoTimestamp = getISOTimestamp(unixTimestamp);

    console.log("Timestamp (ISO):", isoTimestamp);
    console.log("Timestamp (Unix):", unixTimestamp);

    // Prepare the request payload
    const requestPayload = {
      context: {
        domain: "ONDC:RET11",
        action: "search",
        country: "IND",
        city: "std:080",
        core_version: "1.2.0",
        bap_id: process.env.BAP_ID,
        bap_uri: process.env.BAP_URL,
        transaction_id: transactionId,
        message_id: messageId,
        timestamp: isoTimestamp, // ISO 8601 format in the payload
        ttl: "P1M", // 1-hour TTL in ISO 8601 duration format
      },
      message: {
        intent: {
          payment: {
            "@ondc/org/buyer_app_finder_fee_type": "percent",
            "@ondc/org/buyer_app_finder_fee_amount": "6",
          },
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

    // Send the POST request to the ONDC search API
    const response = await axios.post(ONDC_SEARCH_URL, requestPayload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authorizationHeader,
      },
    });

    // Log the successful response
    console.log("Search response:", response.data);
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

// Execute the search request
makeSearchRequest();
