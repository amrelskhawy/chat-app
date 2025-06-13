import express from "express";
import Router from "./routes";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

// Get All routes and register them
app.use(Router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
