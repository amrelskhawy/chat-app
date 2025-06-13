import express from "express";
import Router from "@routes/index";
import { connectDB } from "./db";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

// Get All routes and register them
app.use(Router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const startServer = async () => {
  try {
    // Connect to MongoDB before starting the server
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
