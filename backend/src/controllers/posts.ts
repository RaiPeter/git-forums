import { Request, Response } from "express";
import { db } from "../db/index.js";
import { comments, posts, users } from "../db/schema.js";
import { eq } from "drizzle-orm";

export const getAllPosts = async (req: Request, res: Response) => {
  const result = await db.select().from(posts);
  console.log("posts", result);
  res.json(result);
};

export const insertPost = async (req: Request, res: Response) => {
  const { user_id, title, description } = req.body;
  const result = await db
    .insert(posts)
    .values({ user_id, title, description })
    .returning();

  res.json(result[0]);
};

export const editPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user_id, title, description } = req.body;

  // check if the post was created by the user
  const postCreator = await db
    .select()
    .from(posts)
    .where(eq(posts.user_id, user_id));

  if (postCreator.length === 0) {
    console.log("User not found");
    res.status(401).json({ message: "Unauthorized" });
  }
  // then update the post
  const result = await db
    .update(posts)
    .set({ title, description })
    .where(eq(posts.id, parseInt(id)))
    .returning();

  res
    .status(201)
    .json({ message: "Post updated succesfully!", post: result[0] });
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;

    // check if the post was created by the user
    const postCreator = await db
      .select()
      .from(posts)
      .where(eq(posts.user_id, user_id));

    if (postCreator.length === 0) {
      console.log("User not found");
      res.status(401).json({ message: "Unauthorized" });
    }

    const result = await db.delete(posts).where(eq(posts.id, parseInt(id)));

    res
      .status(200)
      .json({ message: "Post deleted succesfully!", post: result[0] });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await db
    .select()
    .from(posts)
    .where(eq(posts.id, parseInt(id)));

  const commentsWithUsers = await db
    .select({
      id: comments.id,
      content: comments.content,
      created_at: comments.created_at,
      user_id: users.id,
      username: users.username,
      email: users.email,
    })
    .from(comments)
    .innerJoin(users, eq(comments.user_id, users.id))
    .where(eq(comments.post_id, parseInt(id)));

  console.log("post", result, commentsWithUsers);
  res.json({ post: result[0], comments: commentsWithUsers });
};
