import cron from "node-cron";
import { updateEventStatus } from "../services/eventService.js";
import { cleanupEventsAndCommunities } from "../services/cleanupService.js";

// first start is minute, second hour, third week, fouth month, fiveth year.
// Run after every 1 minute.. If need after 2 minutes {"*/2 * * * *"}, after 2 hours {0 */2 * * *}
cron.schedule("* * * * *", async () => {
  await updateEventStatus();
});

// Schedule the cleanup task to run every day at 00:00 (midnight)
cron.schedule("*/5 * * * *", async () => {
  await cleanupEventsAndCommunities();
});
