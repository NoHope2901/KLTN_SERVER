import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import { getNotification } from "../controllers/notification.js";

const router = express.Router();

router.get("/", verifyToken, getNotification);

export default router;
