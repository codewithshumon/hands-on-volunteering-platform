import cron from "node-cron";
import { updateEventStatus } from "../services/eventService.js";

// Schedule the task to run after every 1 minute if need after 2 minutes {"*/2 * * * *"}
cron.schedule("* * * * *", async () => {
  console.log(
    "Running cron job to update event statuses and volunteer hours..."
  );
  await updateEventStatus();
});
