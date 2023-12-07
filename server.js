import express from "express"; // Simple framework for hosting a server
import mongoose from "mongoose"; // MongoDB object modeling tool to work in an asynchronous environment
import dotenv from "dotenv"; // Module that loads environment variables from a .env file into process.env
import cors from "cors"; // Node.js package for providing a Connect/Express middleware

// Router imports
import postsRouter from "./src/app/routes/posts.route.js";

const app = express();
const port = 3000;

// Middleware
app.use(cors());
dotenv.config();
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URL);

// Routes
app.use("/posts", postsRouter);

app.listen(port || 3000, () => {
  console.log(`Serwer działa na http://localhost:${port}`);
});
