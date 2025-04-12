import { Router } from "express";
import {
  getAllUsers,
  signupUser,
  loginUser,
  getHistory,
} from "../controllers/auth.js";

const router = Router();

router.get("/", getAllUsers);
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/history", getHistory);

export default router;
