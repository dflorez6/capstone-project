// Dependencies
import moment from "moment-timezone";

//==========
// Utility Functions: Date Formatting
//==========
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

export { torontoDateTime, torontoDate, torontoTime };
