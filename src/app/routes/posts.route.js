import express from "express";
import mongoose from "mongoose";
import Post from "../models/post.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    if (!req.body._id) {
      req.body._id = new mongoose.Types.ObjectId();
    }
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const existingPost = await Post.findById(postId);
    if (!existingPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    await Post.findByIdAndDelete(postId);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedPost = await Post.findByIdAndUpdate(postId, req.body, {
      new: true,
    });

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

export default router;
