import express from "express";
import { getStudentStatus, updateCouncil } from "../controllers/status.js";
const router = express.Router();

router.get("/", getStudentStatus);
router.put("/update", updateCouncil);
export default router;
