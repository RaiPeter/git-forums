import express, { Request, Response } from "express";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/posts", postRoutes);
app.use("/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
  console.info("Received a request on / endpoint");
  let msg: string = "Hello dWor dfs asdld!";
  res.send(msg);
});

app.listen(PORT, (): void => {
  console.log(`Server is running on port ${PORT}`);
});
