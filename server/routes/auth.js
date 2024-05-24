import express from "express";
import { login, register } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/login", (req, res) => {
  res.send("hello, This is Login page");
});
export default router;
