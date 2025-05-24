import express from "express";
import { protect } from "../middleware/authMiddleware";
import { getShows } from "../controllers/showController";

const router = express.Router();

router.get("/", protect, getShows);

export default router;
