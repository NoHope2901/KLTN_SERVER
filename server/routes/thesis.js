import express from "express";
import {
  createThesis,
  getAllTheses,
  getThesisById,
  getRegisteredThesisId,
  teacherUpdate,
  updateRegistrationStatus,
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

//   http://localhost:3001/theses + các route bên dưới
// create
router.post("/", verifyToken, createThesis);

// read
router.get("/", getAllTheses);
router.get("/getbyid/:id", getThesisById);
router.get("/registered", verifyToken, getRegisteredThesisId);

// update
router.put("/update/:id", teacherUpdate);
router.put("/change/:id", verifyToken, updateRegistrationStatus);
// delete
router.delete("/:id", deleteThesis);

export default router;
