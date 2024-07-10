import express from "express";
import { getStudentStatus } from "../controllers/status.js";
const router = express.Router();

router.get("/", getStudentStatus);
export default router;
