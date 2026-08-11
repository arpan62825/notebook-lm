import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.listen(process.env.PORT || 8081, () => {
  console.log(`Server is running on port ${process.env.PORT || 8081}`);
});
