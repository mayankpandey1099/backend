import express from "express";
import { importCsv } from "../controllers/importController";
import { protect } from "../middleware/authMiddleware";
import { upload } from "../middleware/uploadMiddleware";

const router = express.Router();

router.post("/csv", upload.single("file"), protect, importCsv);

export default router;
