import mongoose from "mongoose"; // 1.Import

const postSchema = new mongoose.Schema({
  // 2.Create Schema
  title: String,
  content: String,
});

const Post = mongoose.model("Post", postSchema); // 3.Call it Post and attatch to schema

export default Post; // 4.Export
