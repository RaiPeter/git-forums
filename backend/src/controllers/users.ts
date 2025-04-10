import { Request, Response } from "express";
import { db } from "../db/index.js";
import { users } from "../db/schema.js";
import bcrypt from "bcrypt";

export const signupUser = async (req: Request, res: Response) => {
  try {
    console.log("signupUser", req.body);
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
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
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  const result = await db.select().from(users);
  console.log("getAllUsers", result);
  res.json(result);
};
