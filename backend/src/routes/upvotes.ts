import { Router } from "express";
import { addUpvote, getUpvote } from "../controllers/upvotes.js";

const router = Router();

router.post("/", addUpvote);
router.get("/", getUpvote);

export default router;
