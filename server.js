import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postsRouter from "./src/app/routes/posts.route.js";

const app = express();

app.use(cors());
dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL);

app.use("/api/posts", postsRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Server works at https://caster-angular-blog-app-api.onrender.com`
  );
});
