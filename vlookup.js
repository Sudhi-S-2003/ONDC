import axios from "axios";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { formatRegistryRequest } from "./cryptic.js"; // Import your helper function

dotenv.config();

const ONDC_VLOOKUP_URL = "https://staging.registry.ondc.org/vlookup";

const makeRequest = async () => {
  try {

    const requestPayload = {
      country: "IND",
      domain: "nic2004:52110",
      type: "buyerApp",
      city: "std:080",
      subscriber_id: process.env.BAP_ID, // Fetch subscriber ID from env
    };

    // Generate signed payload for the request
    const signedRequest = await formatRegistryRequest(requestPayload);

    // Send the POST request to the ONDC vlookup API
    const response = await axios.post(ONDC_VLOOKUP_URL, signedRequest, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Log the successful response
    console.log("Vlookup response:", response.data);
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

makeRequest();
