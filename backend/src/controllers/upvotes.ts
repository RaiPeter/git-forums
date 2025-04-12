import { Request, Response } from "express";
import { db } from "../db/index.js";
import { upvotes } from "../db/schema.js";

export const addUpvote = async (req: Request, res: Response) => {
  const { postId, userId } = req.body;

  try {
    const newUpvote = await db.insert(upvotes).values({
      post_id: postId,
      user_id: userId,
    });

    res
      .status(201)
      .json({ message: "Upvote added successfully", upvote: newUpvote });
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
// // Remove upvote from a post
// export const removeUpvote = async (req: Request, res: Response) => {
//   const { postId, userId } = req.body;

//   try {
//     await db.delete(upvotes).where({
//       post_id: postId,
//       user_id: userId,
//     });

//     res.status(200).json({ message: "Upvote removed successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to remove upvote", error });
//   }
// };
