import { v4 as uuidv4 } from "uuid";
 // Generate unique transaction and message IDs
 const transactionId = uuidv4();
 const messageId = uuidv4();
 const getUnixTimestamp = () => Math.floor(Date.now() / 1000);
 const getISOTimestamp = (unixTimestamp) =>
   new Date(unixTimestamp * 1000).toISOString();
 
 // Get the current Unix and ISO timestamps
 const unixTimestamp = getUnixTimestamp();
 const isoTimestamp = getISOTimestamp(unixTimestamp);

 console.log("Timestamp (ISO):", isoTimestamp);
 console.log("Timestamp (Unix):", unixTimestamp);
 export {transactionId,messageId,isoTimestamp};