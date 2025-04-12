import express, { Request, Response } from "express";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import commentsRoutes from "./routes/comments.js";
import upvotesRoutes from "./routes/upvotes.js";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentsRoutes);
app.use("/upvote", upvotesRoutes);

app.get("/", (req: Request, res: Response) => {
  console.info("Received a request on / endpoint");
  let msg: string = "Hello dWor dfs asdld!";
  res.send(msg);
});

app.listen(PORT, (): void => {
  console.log(`Server is running on port ${PORT}`);
});
