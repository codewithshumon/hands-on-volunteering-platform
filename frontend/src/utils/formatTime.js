const formatTime = (time) => {
  if (!time) return "N/A"; // Fallback for missing time
  const [hours, minutes] = time.split(":");
  if (isNaN(hours) || isNaN(minutes)) return "Invalid Time"; // Fallback for invalid time

  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

export default formatTime;
