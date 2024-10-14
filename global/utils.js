
/**
 * This function is to Convert the JSON Payload to Base64 Encoded Payload 
 */
function encodeJsonToBase64(reqData){
  const jsonData = JSON.stringify(reqData);
  const buffer = Buffer.from(jsonData, 'utf-8'); // Parse JSON as UTF-8 string
  const base64Encoded = buffer.toString('base64');   // Encode UTF-8 string to Base64
  return base64Encoded;
}
/**
 * This function is to Convert the JSON Payload to Decode Base64 
 */
function decodeBase64ToJson(base64String){
  const utf8String = Buffer.from(base64String, 'base64').toString('utf8');   // Decode Base64 to UTF-8 string
  const jsonData = JSON.parse(utf8String);   // Parse UTF-8 string as JSON
  return jsonData;
}
/**
 * This function is to parse the date
 */
function parseDate(dateStr) {
  const [day, month, year] = dateStr.split('/');
  return new Date(year, month - 1, day);
}
/**
* This function is to convert string "true"/"false" to boolean
*/
function parseBoolean(boolStr) {
  return boolStr.toLowerCase() === "true";
}
/**
 * This function is to give the date format in Month Date, Year (ex : June 01 2024)
 */
const longDateFormat = (timeStamp) => {
  const date = new Date(timeStamp);
  const formattedDate = date.toLocaleString('en-US', {  day: 'numeric', month: 'short', year: 'numeric' });
  return formattedDate.replace(/,/g, "");
};
/**
 * This function is to give the date format in Date Month, Year (ex : 15/08/2024)
 */
function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
/**
 * This function is to give the date format in Month Date, Year (ex : June 01 2024)
 */
const DateFormat = (timeStamp) => {
  const date = new Date(timeStamp);
  const formattedDate = date.toLocaleString('en-GB', { day: '2-digit', month: 'long',  year: 'numeric' });
  return formattedDate.replace(/,/g, "");
};
/**
 * This function is to give the date format in Month Year (ex : June 2024)
 */
const DateYearFormat = (timeStamp) => {
  const date = new Date(timeStamp);
  const formattedDate = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  return formattedDate.replace(/,/g, "");
};

/**
 * This function is to give the time format in 12 Hours. (10:30 AM/PM)
 */
const formatTimeIST = (timeStamp) => {
  const date = new Date(timeStamp);
  const formattedTime = date.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  return formattedTime;
};
/**
 * This function is to format the amount in INR
 */
const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount).replace("₹","₹ ").replace(".00","")
}

module.exports = { 
    encodeJsonToBase64,
    decodeBase64ToJson,
    parseDate,
    parseBoolean,
    longDateFormat,
    formatTimeIST,
    formatAmount,
    DateYearFormat,
    DateFormat,
};