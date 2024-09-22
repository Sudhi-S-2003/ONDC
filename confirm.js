import axios from "axios";
import { createAuthorizationHeader } from "./cryptic.js";
import dotenv from "dotenv";
dotenv.config();
const ONDC_SEARCH_URL = (await import('./Url/PREPRODSELLERURL.js')).default;
const ONDC_DOMAINS=(await import("./Url/Domain.js")).default.CONFIRM;
console.log(ONDC_SEARCH_URL,ONDC_DOMAINS)
const makeSearchRequest = async () => {
  try {
    const requestPayload = (await import('./Schema/Preprod/confirm.js')).default
    console.log(requestPayload)
    if (!process.env.BAP_ID || !process.env.BAP_URL) {
      throw new Error("Missing BAP_ID or BAP_URL in environment variables");
    }
    const authorizationHeader = await createAuthorizationHeader(requestPayload);
    console.log("Authorization Header:", authorizationHeader);
    const response = await axios.post(`${ONDC_SEARCH_URL}${ONDC_DOMAINS}`, requestPayload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authorizationHeader,
        "X-Gateway-Authorization": authorizationHeader,
      },
    });
    console.log("Search response:", response.data);
  } catch (error) {
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      console.error("Error response headers:", error.response.headers);
    } else {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
  }
};
makeSearchRequest();