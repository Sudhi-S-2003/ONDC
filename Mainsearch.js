import axios from "axios";
import { createAuthorizationHeader } from "./signing.js"; // Adjust import as needed

const ONDC_SEARCH_URL = "https://staging.gateway.proteantech.in/search";

const makeSearchRequest = async () => {
  try {
    // Use Unix timestamp format for the timestamp field
    const timestamp = Math.floor(Date.now() / 1000).toString();
    
    const requestPayload = {
      context: {
        domain: "ONDC:RET10",
        action: "search",
        country: "IND",
        city: "std:080",
        core_version: "1.2.0",
        bap_id: "ondc.howincloud.com",
        bap_uri: "https://ondc.howincloud.com",
        transaction_id: "T1",
        message_id: "M1",
        timestamp: timestamp,
        ttl: "PT30S",
      },
      message: {
        intent: {
          category: { id: "Foodgrains" },
          fulfillment: { type: "Delivery" },
          payment: {
            "@ondc/org/buyer_app_finder_fee_type": "percent",
            "@ondc/org/buyer_app_finder_fee_amount": "3",
          },
          tags: [
            {
              code: "bap_terms",
              list: [
                { code: "static_terms", value: "" },
                {
                  code: "static_terms_new",
                  value:
                    "https://github.com/ONDC-Official/NP-Static-Terms/buyerNP_BNP/1.0/tc.pdf",
                },
                {
                  code: "effective_date",
                  value: "2023-10-01T00:00:00.000Z",
                },
              ],
            },
          ],
        },
      },
    };

    // Create the authorization header
    const authorizationHeader = await createAuthorizationHeader(requestPayload);

    // Debugging
    console.log("Authorization Header:", authorizationHeader);

    // Send the request
    const response = await axios.post(ONDC_SEARCH_URL, requestPayload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authorizationHeader,
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
    }
  }
};

makeSearchRequest();
