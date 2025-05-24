import express from "express";
import { protect } from "../middleware/authMiddleware";
import { getShows, searchShows } from "../controllers/showController";

const router = express.Router();

router.get("/", protect, getShows);
router.get("/search", protect, searchShows);

export default router;
