import express from "express";
import connectDB from "./config/db";

const app = express();

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("FletNix Backend is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
