//
//
//  // IF TIME SAVE AS STRING IN SCHEMA
//
// const formatTime = (time) => {
//   if (!time) return "N/A"; // Fallback for missing time
//   const [hours, minutes] = time.split(":");
//   if (isNaN(hours) || isNaN(minutes)) return "Invalid Time"; // Fallback for invalid time
//   const date = new Date();
//   date.setHours(hours);
//   date.setMinutes(minutes);
//   return date.toLocaleTimeString("en-US", {
//     hour: "numeric",
//     minute: "numeric",
//     hour12: true,
//   });
// };
// export default formatTime;
//
//  // IF TIME SAVE AS STRING IN SCHEMA
//
//

//IF TIME SAVE AS DATE FORMATE IN SCHEMA

const formatTime = (time) => {
  if (!time) return "N/A"; // Fallback for missing time

  // Parse the time if it's a string (e.g., "2025-03-20T04:00:00.000Z")
  const date = new Date(time);

  // Check if the date is valid
  if (isNaN(date.getTime())) return "Invalid Time"; // Fallback for invalid time

  // Format the time in the local time zone
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

export default formatTime;
