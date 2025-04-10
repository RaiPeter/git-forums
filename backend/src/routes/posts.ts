import { Router } from "express";
import {
  getAllPosts,
  insertPost,
  editPost,
  deletePost,
} from "../controllers/posts.js";

const router = Router();

router.get("/", getAllPosts);
router.post("/", insertPost);
router.put("/:id", editPost);
router.delete("/:id", deletePost);

export default router;
