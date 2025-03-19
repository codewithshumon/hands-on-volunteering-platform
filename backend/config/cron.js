import cron from "node-cron";
import { updateEventStatus } from "../services/eventService.js";

// Schedule the task to run every 2 minutes
cron.schedule("*/2 * * * *", () => {
  console.log("Running event status update task...");
  updateEventStatus();
});
