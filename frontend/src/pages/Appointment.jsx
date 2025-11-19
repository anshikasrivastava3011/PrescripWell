import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import axios from "axios";
import { toast } from "react-toastify";

const Appointment = () => {
  const { docId } = useParams();
  const {
    doctors,
    currencySymbol,
    backendUrl,
    token,
    getDoctosData,
  } = useContext(AppContext);

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(false);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  // Reviews
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hasReviewed, setHasReviewed] = useState(false);
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);

  const navigate = useNavigate();

  // ---- Doctor info ----
  const fetchDocInfo = () => {
    const info = doctors.find((d) => d._id === docId);
    setDocInfo(info);
  };

  // ---- Slots ----
  const getAvailableSolts = async () => {
    setDocSlots([]);
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      const timeSlots = [];
      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();

        const slotDate = `${day}_${month}_${year}`;
        const stime = formattedTime;

        const isSlotAvailable =
          docInfo.slots_booked[slotDate] &&
            docInfo.slots_booked[slotDate].includes(stime)
            ? false
            : true;

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  // ---- Book appointment ----
  const bookAppointment = async () => {
    if (!token) {
      toast.warning("Login to book appointment");
      return navigate("/login");
    }

    const date = docSlots[slotIndex][0].datetime;
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const slotDate = `${day}_${month}_${year}`;

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getDoctosData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // ---- Effects: doctor + slots ----
  useEffect(() => {
    if (doctors.length > 0) fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) getAvailableSolts();
  }, [docInfo]);

  // ---- Fetch reviews & whether this user has reviewed ----
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // token is optional here; if present the backend can compute hasReviewed
        const { data } = await axios.get(`${backendUrl}/api/reviews/${docId}`, {
          headers: token ? { token } : {},
        });
        if (data.success) {
          setReviews(data.reviews || []);
          if (typeof data.hasReviewed === "boolean") {
            setHasReviewed(data.hasReviewed);
          }
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };
    fetchReviews();
  }, [docId, token, backendUrl]);

  // ---- Submit review ----
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.info("Please log in to submit a review");
      return navigate("/login");
    }
    if (!rating || !comment.trim()) {
      toast.warning("Please provide both rating and comment.");
      return;
    }

    try {
      const res = await axios.post(
        `${backendUrl}/api/reviews/add`,
        { doctorId: docId, rating, comment },
        { headers: { token } }
      );

      if (res.data?.success) {
        toast.success("Review submitted successfully!");
        setComment("");
        setRating(0);
        setHasReviewed(true);

        // refresh reviews
        const refreshed = await axios.get(`${backendUrl}/api/reviews/${docId}`, {
          headers: token ? { token } : {},
        });
        if (refreshed.data?.success) {
          setReviews(refreshed.data.reviews || []);
        }

        // update average rating in the visible card, if backend returns it
        if (res.data.averageRating) {
          setDocInfo((prev) =>
            prev ? { ...prev, averageRating: res.data.averageRating } : prev
          );
        }
      } else {
        toast.error(res.data?.message || "Failed to add review");
      }
    } catch (error) {
      console.error("Error adding review:", error);
      toast.error(
        error?.response?.data?.message || "You may have already added a review"
      );
    }
  };

  // ---- UI ----
  return docInfo ? (
    <div>
      {/* Doctor header */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img
            className="bg-primary w-full sm:max-w-72 rounded-lg"
            src={docInfo.image}
            alt=""
          />
        </div>

        <div className="flex-1 border border-[#ADADAD] rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
            {docInfo.name}
            <img className="w-5" src={assets.verified_icon} alt="" />
          </p>

          <p className="text-yellow-500 mt-1">
            ⭐ {docInfo.averageRating ? docInfo.averageRating : "No ratings yet"}
          </p>

          <div className="flex items-center gap-2 mt-1 text-gray-600">
            <p>
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">
              {docInfo.experience}
            </button>
          </div>

          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-[#262626] mt-3">
              About <img className="w-3" src={assets.info_icon} alt="" />
            </p>
            <p className="text-sm text-gray-600 max-w-[700px] mt-1">
              {docInfo.about}
            </p>
          </div>

          <p className="text-gray-600 font-medium mt-4">
            Appointment fee:{" "}
            <span className="text-gray-800">
              {currencySymbol}
              {docInfo.fees}
            </span>
          </p>
        </div>
      </div>

      {/* Booking */}
      <div className="sm:ml-72 sm:pl-4 mt-8 font-medium text-[#565656]">
        <p>Booking slots</p>

        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
          {docSlots.length &&
            docSlots.map((item, index) => (
              <div
                onClick={() => setSlotIndex(index)}
                key={index}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index
                    ? "bg-primary text-white"
                    : "border border-[#DDDDDD]"
                  }`}
              >
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))}
        </div>

        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
          {docSlots.length &&
            docSlots[slotIndex].map((item, index) => (
              <p
                onClick={() => setSlotTime(item.time)}
                key={index}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime
                    ? "bg-primary text-white"
                    : "text-[#949494] border border-[#B4B4B4]"
                  }`}
              >
                {item.time.toLowerCase()}
              </p>
            ))}
        </div>

        <button
          onClick={bookAppointment}
          className="bg-primary text-white text-sm font-light px-20 py-3 rounded-full my-6"
        >
          Book an appointment
        </button>
      </div>

      {/* Reviews */}
      <div className="mt-12 border-t pt-8 sm:ml-72 sm:pl-4">
        <h2 className="text-2xl font-semibold text-[#10267e] mb-4">
          Patient Reviews
        </h2>

        {reviews.length === 0 ? (
          <p className="text-gray-500">
            No reviews yet. Be the first to share your experience!
          </p>
        ) : (
          <div className="space-y-4">
            {reviews.map((rev, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-800">{rev.userId?.name || "Anonymous"}</p>
                    <p className="text-[#fbbf24]">⭐ {rev.rating}/5</p>
                  </div>
                  <p className="text-gray-500 text-sm">
                    {new Date(rev.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-gray-700">{rev.comment}</p>

              </div>
            ))}

          </div>
        )}

        {/* Review Form (only if logged in and not reviewed) */}
        {token && !hasReviewed && (
          <form onSubmit={handleSubmitReview} className="mt-6 space-y-3">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Your Rating
              </label>
              <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={star <= rating ? "#fbbf24" : "none"}
                    stroke="#fbbf24"
                    strokeWidth="2"
                    className="w-7 h-7 cursor-pointer transition-transform hover:scale-110"
                    onClick={() => setRating(star)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.26 4.58 5.05.733a.563.563 0 01.312.96l-3.656 3.563.863 5.032a.563.563 0 01-.817.593L12 17.347l-4.54 2.383a.563.563 0 01-.817-.593l.863-5.032L3.85 9.772a.563.563 0 01.312-.96l5.05-.733 2.26-4.58z"
                    />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                {rating > 0
                  ? `You rated this ${rating} star${rating > 1 ? "s" : ""}`
                  : "Click to rate"}
              </p>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Your Comment
              </label>
              <textarea
                rows="3"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Share your experience..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-[#4A6CF7] text-white px-4 py-2 rounded-lg hover:bg-[#3958c5] transition-all"
            >
              Submit Review
            </button>
          </form>
        )}

        {!token && (
          <p className="mt-6 text-sm text-gray-500">
            Please log in to submit a review.
          </p>
        )}

        {token && hasReviewed && (
          <div className="mt-6 bg-green-50 border border-green-200 p-4 rounded-lg text-green-700 font-medium">
            ✅ You’ve already submitted a review for this doctor.
          </div>
        )}
      </div>

      <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
    </div>
  ) : null;
};

export default Appointment;


