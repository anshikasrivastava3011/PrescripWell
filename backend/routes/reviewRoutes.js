import express from "express";
import { addReview, getDoctorReviews } from "../controllers/reviewController.js";

const router = express.Router();

// POST new review
router.post("/add", addReview);

// GET reviews for a doctor
router.get("/:doctorId", getDoctorReviews);

export default router;
