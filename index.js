import express from "express";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ health: "Ok" });
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
