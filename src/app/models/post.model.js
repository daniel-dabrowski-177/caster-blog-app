import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  _id: String,
  title: String,
  content: String,
});

const Post = mongoose.model("Post", postSchema);

export default Post;
