import axios from "axios";
import { createAuthorizationHeader } from "./cryptic.js"; // Adjust import path as needed
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

// Set the ONDC confirm endpoint
const ONDC_CONFIRM_URL = "https://ondcsellerapp.revalsys.com/api/ondc/confirm";

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
        domain: "nic2004:52110",
        action: "confirm",
        country: "IND",
        city: "std:080",
        core_version: "1.2.0",
        bap_id: process.env.BAP_ID,
        bpp_id: "ondcsellerapp.revalsys.com",
        bpp_uri: "https://ondcsellerapp.revalsys.com/api/ondc",
        bap_uri: process.env.BAP_URL,
        transaction_id: transactionId,
        message_id: messageId,
        timestamp: isoTimestamp,
        ttl: "P1M", // Time to live for the message
      },
      message: {
        order: {
          provider: {
            id: "P1",
            locations: [
              {
                id: "RL1", // Location ID
              },
            ],
          },
          items: [
            {
              id: "wsi|0F81B74E-485F-4505-9E43-977DD18188DC", // Item ID
              quantity: {
                count: 1, // Quantity confirmed by the buyer
              },
              price: {
                currency: "INR",
                value: "12897.00", // Confirmed price of the item
              },
              fulfillment_id: "FL1", // Fulfillment ID
            },
          ],
          fulfillments: [
            {
              id: "FL1",
              "@ondc/org/provider_name": "wsi",
              tracking: false,
              "@ondc/org/category": "Immediate Delivery",
              "@ondc/org/TAT": "PT3H",
              type: "Delivery",
              state: {
                descriptor: {
                  name: "Order Confirmed",
                },
              },
              end: {
                location: {
                  gps: "12.9715987,77.594566",
                  address: {
                    door: "123",
                    building: "ABC Apartments",
                    street: "MG Road",
                    city: "Bangalore",
                    state: "Karnataka",
                    country: "IND",
                    area_code: "560001",
                  },
                },
                contact: {
                  phone: "9876543210",
                  email: "johndoe@example.com",
                },
              },
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
          payment: {
            type: "ON-DELIVERY",
            status: "NOT-PAID", // Payment status can be updated as needed
          },
          quote: {
            price: {
              currency: "INR",
              value: "12897.00", // Total price of the order
            },
            breakup: [
              {
                title: "Item Price",
                price: { currency: "INR", value: "12897" },
              },
              {
                title: "Tax",
                price: { currency: "INR", value: "100" },
              },
              {
                title: "Delivery Charges",
                price: { currency: "INR", value: "10" },
              },
            ],
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
