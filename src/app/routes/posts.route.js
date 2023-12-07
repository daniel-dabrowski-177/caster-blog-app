import express from "express";
import Post from "../models/post.model.js"; // 1.Import model

const router = express.Router(); // 2. Import router

router.get("/", async (req, res) => {
  // 3.Create request and handle responses
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router; // 4. Export
