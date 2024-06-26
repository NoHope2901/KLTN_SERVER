import express from "express";
import {
  createThesis,
  getAllTheses,
  getThesisById,
  teacherUpdate,
  studentUpdate,
  deleteThesis,
} from "../controllers/thesis.js";
import { verifyToken } from "../middlewares/auth.js";
import { checkDeadline } from "../middlewares/checkDeadline.js";

const router = express.Router();

// // create
// router.post("/", verifyToken,checkDeadline, createThesis);

// // read
// router.get("/", verifyToken, getAllTheses);
// router.get("/:id", verifyToken, getThesisById);

// // update
// router.put("tc/:id", verifyToken, checkDeadline, teacherUpdate);
// router.put("st/:id", verifyToken, checkDeadline, studentUpdate);
// // delete
// router.delete("/:id", verifyToken, checkDeadline, deleteThesis);

// create
router.post("/", verifyToken, createThesis);

// read
router.get("/", getAllTheses);
router.get("/:id", getThesisById);

// update
router.put("tc/:id", teacherUpdate);
router.put("st/:id", studentUpdate);
// delete
router.delete("/:id", deleteThesis);

export default router;
