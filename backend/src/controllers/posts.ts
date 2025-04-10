import { Request, Response } from "express";
import { db } from "../db/index.js";
import { posts } from "../db/schema.js";

export const getAllPosts = async (req: Request, res: Response) => {
  const result = await db.select().from(posts);
  console.log("posts", result);
  res.json(result[0]);
};

export const insertPost = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const result = await db
    .insert(posts)
    .values({ title, description })
    .returning();
  res.json(result[0]);
};
