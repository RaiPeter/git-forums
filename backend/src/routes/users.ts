import { Router } from "express";
import { getAllUsers, signupUser } from "../controllers/users.js";

const router = Router();

router.get("/", getAllUsers);
router.post("/signup", signupUser);

export default router;
