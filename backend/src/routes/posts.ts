import { Router } from "express";
import {
  getAllPosts,
  insertPost,
  editPost,
  deletePost,
  getPost,
} from "../controllers/posts.js";

const router = Router();

router.get("/", getAllPosts);
router.post("/", insertPost);
router.get("/:id", getPost); // Assuming you want to get a single post by ID
router.put("/:id", editPost);
router.delete("/:id", deletePost);

export default router;
