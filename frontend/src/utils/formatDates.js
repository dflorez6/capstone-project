// Dependencies
import moment from "moment-timezone";

//==========
// Utility Functions: Date Formatting
//==========
//----------
// UTC to Toronto Time
//----------
// Helper function to format date & time from UTC to Toronto time and format it for dateTimePicker (Eastern Time Zone)
const torontoDateTimeDatePicker = (utcDate) => {
  // Convert UTC date to Toronto time
  const torontoTime = moment.utc(utcDate).tz("America/Toronto");

  // Format date using moment.js format
  return torontoTime.format("YYYY-MM-DDTHH:mm");
};

// Helper function to format date & time from UTC to Toronto time (Eastern Time Zone)
const torontoDateTime = (utcDate) => {
  // Convert UTC date to Toronto time
  const torontoTime = moment.utc(utcDate).tz("America/Toronto");

  // Format date using moment.js format
  return torontoTime.format("MMM DD, YYYY hh:mm A");
};

// Helper function to format date from UTC to Toronto time (Eastern Time Zone)
const torontoDate = (utcDate) => {
  // Convert UTC date to Toronto time
  const torontoTime = moment.utc(utcDate).tz("America/Toronto");

  // Format date using moment.js format
  return torontoTime.format("MMM DD, YYYY");
};

// Helper function to format time from UTC to Toronto time (Eastern Time Zone)
const torontoTime = (utcDate) => {
  // Convert UTC date to Toronto time
  const torontoTime = moment.utc(utcDate).tz("America/Toronto");

  // Format date using moment.js format
  return torontoTime.format("hh:mm A");
};

//----------
// Toronto Time to UTC
//----------
// Helper function to format date & time from Toronto time to UTC
const torontoDateTimeToUTC = (torontoTime) => {
  // Parse the Toronto time using moment-timezone
  const parsedTime = moment.tz(torontoTime, "America/Toronto");

  // Convert to UTC time
  const utcTime = parsedTime.utc();

  // Format the UTC time as desired
  const formattedUTC = utcTime.format("YYYY-MM-DDTHH:mm:ss[Z]"); // Adjust format as needed

  return formattedUTC;
};

export {
  torontoDateTime,
  torontoDateTimeDatePicker,
  torontoDate,
  torontoTime,
  torontoDateTimeToUTC,
};
