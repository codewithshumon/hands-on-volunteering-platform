import express from "express";

import verifyToken from "../controllers/authController.js";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getMyEvents,
  joinEvent,
  leaveEvent,
  updateEvent,
} from "../controllers/eventController.js";

const router = express.Router();

router.get("/get-all-events", verifyToken, getAllEvents);

router.get("/get-my-events/:userId", verifyToken, getMyEvents);

router.post("/create-event", verifyToken, createEvent);

router.post("/join/:eventId", verifyToken, joinEvent);

router.put("/update/:eventId", verifyToken, updateEvent);

router.post("/leave/:eventId", verifyToken, leaveEvent);

router.delete("/delete/:eventId", verifyToken, deleteEvent);

export default router;
