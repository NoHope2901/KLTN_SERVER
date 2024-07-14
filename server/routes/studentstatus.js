import express from "express";
import { getStudentStatus, updateCouncil, deleteStudentStatus } from "../controllers/status.js";
const router = express.Router();

router.get("/", getStudentStatus);
router.put("/update", updateCouncil);
router.delete("/delete", deleteStudentStatus);
export default router;
