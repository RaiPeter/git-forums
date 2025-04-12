import { Request, Response } from "express";
import { db } from "../db/index.js";
import { comments, posts, upvotes, users } from "../db/schema.js";
import bcrypt from "bcrypt";
import { eq, sql } from "drizzle-orm";

export const signupUser = async (req: Request, res: Response) => {
  try {
    console.log("signupUser", req.body);
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser.length > 0) {
      console.log("User already exists", existingUser[0]);
      res.status(401).json({ message: "User already exists" });
    }

    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await db
      .insert(users)
      .values({ username, email, password: hashedPassword })
      .returning();

    res.json(result[0]);
  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    console.log("loginUser", req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser.length === 0) {
      console.log("User not found", existingUser[0]);
      res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser[0].password
    );

    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials" });
    }

    const user = {
      id: existingUser[0].id,
      username: existingUser[0].username,
      email: existingUser[0].email,
    };

    res.status(200).json({ message: "Logged in successfully", user });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  const result = await db.select().from(users);
  console.log("getAllUsers", result);
  res.json(result);
};

export const getHistory = async (req: Request, res: Response) => {
  const userId = parseInt(req.query.user_id as string);

  if (!userId) {
    res.status(400).json({ message: "Missing user_id" });
  }

  try {
    const userPosts = await db
      .select({
        id: posts.id,
        title: posts.title,
        created_at: posts.created_at,
      })
      .from(posts)
      .where(eq(posts.user_id, userId));

    const userPostsWithType = userPosts.map((post) => ({
      ...post,
      type: "post",
    }));

    const userComments = await db
      .select({
        id: comments.id,
        content: comments.content,
        created_at: comments.created_at,
        postId: posts.id,
        postTitle: posts.title,
        postAuthor: users.username,
      })
      .from(comments)
      .innerJoin(posts, eq(comments.post_id, posts.id))
      .innerJoin(users, eq(posts.user_id, users.id))
      .where(eq(comments.user_id, userId));

    const userCommentsWithType = userComments.map((comment) => ({
      ...comment,
      type: "comment",
    }));

    const userUpvotes = await db
      .select({
        id: upvotes.id,
        created_at: upvotes.created_at,
        postId: posts.id,
        postTitle: posts.title,
        postAuthor: users.username,
      })
      .from(upvotes)
      .innerJoin(posts, eq(upvotes.post_id, posts.id))
      .innerJoin(users, eq(posts.user_id, users.id))
      .where(eq(upvotes.user_id, userId));

    const userUpvotesWithType = userUpvotes.map((upvote) => ({
      ...upvote,
      type: "upvote",
    }));

    const combinedHistory = [
      ...userPostsWithType,
      ...userCommentsWithType,
      ...userUpvotesWithType,
    ].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    console.log(combinedHistory);

    res.json({ history: combinedHistory });
  } catch (err) {
    console.error("Error getting the history");
    res.status(400).json({ message: "Error getting the history" });
  }
};
