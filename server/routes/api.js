import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import { getDataByThesis } from "../controllers/api.js";

const router = express.Router();

router.get("/", verifyToken, getDataByThesis);

export default router;
