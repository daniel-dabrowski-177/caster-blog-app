import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import Post from "../src/app/models/post.model.js";
import router from "../src/app/routes/posts.route.js";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use("/api/posts", router);

app.use(cors());
dotenv.config();
app.use(express.json());

describe("Posts API Tests", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Post.deleteMany({});
  });

  it("should retrieve an empty array for GET /api/posts when no posts are present", async () => {
    const response = await request(app).get("/api/posts");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("should retrieve existing posts for GET /api/posts when posts are present", async () => {
    const existingPost = new Post({
      title: "Existing Post",
      content: "Existing Content",
    });
    await existingPost.save();

    const response = await request(app).get("/api/posts");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]._id).toBeDefined();
    expect(response.body[0].title).toBe(existingPost.title);
    expect(response.body[0].content).toBe(existingPost.content);
  });

  it("should add a new post for POST /api/posts", async () => {
    const postData = { title: "Test Post", content: "Test Content" };
    const response = await request(app).post("/api/posts").send(postData);

    expect(response.status).toBe(201);
    expect(response.body._id).toBeDefined();
    expect(response.body.title).toBe(postData.title);
    expect(response.body.content).toBe(postData.content);
  });
});
