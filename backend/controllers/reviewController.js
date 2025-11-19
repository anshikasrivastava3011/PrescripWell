// backend/controllers/reviewController.js
import jwt from "jsonwebtoken";
import Review from "../models/reviewModel.js";
import Doctor from "../models/doctorModel.js";
import Appointment from "../models/appointmentModel.js";

// POST /api/reviews/add
export const addReview = async (req, res) => {
  try {
    // token can come as "token" or "Authorization: Bearer <token>"
    const token = req.headers.token || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ success: false, message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { doctorId, rating, comment } = req.body;
    if (!doctorId || !rating || !comment?.trim()) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // block duplicate review by same user for same doctor
    const already = await Review.findOne({ doctorId, userId });
    if (already) {
      return res.status(400).json({ success: false, message: "You already reviewed this doctor." });
    }

    const review = await Review.create({ doctorId, userId, rating, comment });

    // recalc avg rating
    const all = await Review.find({ doctorId });
    const avg = all.reduce((s, r) => s + r.rating, 0) / all.length;
    await Doctor.findByIdAndUpdate(doctorId, { averageRating: Number(avg.toFixed(1)) });

    res.status(201).json({ success: true, message: "Review added", review });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const getDoctorReviews = async (req, res) => {
  try {
    const { doctorId } = req.params;

    // token optional (to determine hasReviewed)
    const token = req.headers.token || req.headers.authorization?.split(" ")[1];
    let myId = null;
    if (token) {
      try { myId = jwt.verify(token, process.env.JWT_SECRET)?.id; } catch { /* ignore */ }
    }

    const reviews = await Review.find({ doctorId })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    const hasReviewed = !!(myId && reviews.some(r => String(r.userId?._id || r.userId) === String(myId)));

    const avg = reviews.length
      ? Number((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1))
      : 0;

    res.json({ success: true, reviews, averageRating: avg, hasReviewed });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};