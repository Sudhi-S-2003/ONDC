import axios from "axios";
import { createAuthorizationHeader } from "./cryptic.js"; // Adjust import path as needed
import dotenv from "dotenv";

dotenv.config();

// Set the ONDC select endpoint
const ONDC_SELECT_URL = "https://ondcpreprod.sellerapp.in/bpp/u";
const ONDC_SEARCH_DOMAIN="/status"
const makeSelectRequest = async () => {
  try {
   
    // Prepare the request payload with the specific item data
    const requestPayload = import("./schema/status.js");
    const messagePayload=(await requestPayload).default;
    // Ensure environment variables are present
    if (!process.env.BAP_ID || !process.env.BAP_URL) {
      throw new Error(
        "Missing BAP_ID, BAP_URL, BPP_ID or BPP_URL in environment variables"
      );
    }

    // Create the Authorization header using the message part of the payload
    const authorizationHeader = await createAuthorizationHeader(messagePayload);

    // Log the generated Authorization header for debugging
    console.log("Authorization Header:", authorizationHeader);

    // Send the POST request to the ONDC select API
    const response = await axios.post(`${ONDC_SELECT_URL}${ONDC_SEARCH_DOMAIN}`, messagePayload, {
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
