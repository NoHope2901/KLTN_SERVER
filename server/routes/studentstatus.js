import express from "express";
import { verifyToken } from "../middlewares/auth.js";

import {
  getStudentStatus,
  updateCouncil,
  deleteStudentStatus,
  getStudentStatusByCouncilName,
} from "../controllers/status.js";
const router = express.Router();

router.get("/", getStudentStatus);
router.get("/getlist", verifyToken, getStudentStatusByCouncilName);

router.put("/update", updateCouncil);
router.delete("/delete", deleteStudentStatus);
export default router;
