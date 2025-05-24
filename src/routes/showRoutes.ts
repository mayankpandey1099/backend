import express from "express";
import { protect } from "../middleware/authMiddleware";
import { getShowDetails, getShows, searchShows } from "../controllers/showController";

const router = express.Router();

router.get("/", protect, getShows);
router.get("/search", protect, searchShows);
router.get("/:id", protect, getShowDetails);

export default router;
