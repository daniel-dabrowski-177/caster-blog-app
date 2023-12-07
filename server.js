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

app.use("/posts", postsRouter);
app.use("/api", postsRouter); // Użyj router pod ścieżką '/api'

app.listen(port || 3000, () => {
  console.log(`Serwer działa na http://localhost:${port}`);
});
