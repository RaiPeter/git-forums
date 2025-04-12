import { Request, Response } from "express";
import { db } from "../db/index.js";
import { upvotes } from "../db/schema.js";
import { and, eq } from "drizzle-orm";

export const addUpvote = async (req: Request, res: Response) => {
  const { post_id, user_id } = req.body;

  try {
    await db.insert(upvotes).values({
      post_id: post_id,
      user_id: user_id,
    });

    res.status(201).json({ message: "Upvote added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add upvote", error });
  }
};

export const getUpvote = async (req: Request, res: Response) => {
  try {
    const data = await db.select().from(upvotes);
    res.json({ upvotes: data });
  } catch (error) {
    res.json({ message: "Error getting the upvotes" });
  }
};

export const removeUpvote = async (req: Request, res: Response) => {
  const { post_id, user_id } = req.body;

  try {
    await db
      .delete(upvotes)
      .where(and(eq(upvotes.post_id, post_id), eq(upvotes.user_id, user_id)));

    res.status(200).json({ message: "Upvote removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove upvote", error });
  }
};
