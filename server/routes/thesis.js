import express from "express";
import { createThesis, getAllTheses, getThesisById, updateThesis, deleteThesis } from "../controllers/thesis.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// create
router.post("/", verifyToken, createThesis);

// read
router.get("/", verifyToken, getAllTheses);
router.get("/:id", verifyToken, getThesisById);

// update
router.put("/:id", verifyToken, updateThesis);
// delete
router.delete("/:id", verifyToken, deleteThesis);

export default router;
