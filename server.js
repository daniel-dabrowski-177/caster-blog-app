import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postsRouter from "./src/app/routes/posts.route.js";

const app = express();

app.use(cors());
dotenv.config();
app.use(express.json());

app.use(express.static(path.join(__dirname, "/dist/caster-blog-app")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/dist/caster-blog-app", "index.html"));
});

mongoose.connect(process.env.MONGO_URL);

app.use("/api/posts", postsRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Server works at https://caster-angular-blog-app-full.onrender.com`
  );
});
