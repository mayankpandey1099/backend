import express from "express";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import importRoutes from "./routes/importRoutes";
import showRoutes from "./routes/showRoutes";

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/import", importRoutes);
app.use("/api/shows", showRoutes);

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ status: 200, message: "FletNix Backend is running", data: null });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
