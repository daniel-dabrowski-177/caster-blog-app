import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postsRouter from "./src/app/routes/posts.route.js";

const app = express();
const port = 3000;

app.use(cors());
dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL);

app.use("/api/posts", postsRouter);

app.listen(port || 3000, () => {
  console.log(`Server works at http://localhost:${port}`);
});
