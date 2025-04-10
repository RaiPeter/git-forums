import { Router } from "express";
import { getAllUsers, signupUser, loginUser } from "../controllers/auth.js";

const router = Router();

router.get("/", getAllUsers);
router.post("/signup", signupUser);
router.post("/login", loginUser);

export default router;
