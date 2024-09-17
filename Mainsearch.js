import axios from "axios";
import { createAuthorizationHeader } from "./signing.js"; // Adjust import as needed

const ONDC_SEARCH_URL = "https://staging.gateway.proteantech.in/search";

const makeSearchRequest = async () => {
  try {
    // Use Unix timestamp format for the timestamp field
    const timestamp = Date()
    console.log('timestamp:',timestamp)
    
    const requestPayload = {
      
        "context": {
            "domain": "ONDC:RET11",
            "action": "search",
            "country": "IND",
            "city": "std:080",
            "core_version": "1.2.0",
            "bap_id": process.env.BAP_ID,
            "bap_uri": process.env.BAP_URL,
            "transaction_id": "04df37ca-6745-4c97-822a-7b6790228675",
            "message_id": "fa4d983d-91bf-4b32-8d09-8f1c6632cf31",
            "timestamp": timestamp,
            "ttl": "PT3600S"
        },
        "message": {
            "intent": {
                "payment": {
                    "@ondc/org/buyer_app_finder_fee_type": "percent",
                    "@ondc/org/buyer_app_finder_fee_amount": "6"
                }
            }
        }
    
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
