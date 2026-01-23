import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { GeneralCoreService } from "../config/GeneralCoreService";
import { message, Spin } from "antd";
import { useParams } from "next/navigation";
import Xloader from "./ui/Xloader";
import { getUser } from "../utility";

export default function ReviewSection({ data, courseId, getApi, ui }: any) {
    const [loader, setLoader] = useState(false)
    const [reviews, setReviews] = useState([
        {
            name: "John Doe",
            rating: 5,
            review: "Amazing experience! Highly recommended."
        },
        {
            name: "Sarah Khan",
            rating: 4,
            review: "Very good, but there is room for improvement."
        }
    ]);

    const [form, setForm] = useState({
        name: "",
        rating: 0,
        review: ""
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const user = getUser()
        if (user) {
            const payload = {
                // name, review, course_id, rating
                course_id: courseId,
                ...form
            }
            setLoader(true)
            GeneralCoreService('reviews').Save(payload)
                .then((res) => {

                    if (res?.status === 201) {

                        message.success(res?.message)
                        getApi(courseId)
                    } else {
                        message.error(res?.message)
                    }
                })
                .catch((err) => console.log('error', err))
                .finally(() => setLoader(false))

            setForm({ name: "", rating: 0, review: "" });
        } else {
            message.error('You need to signin first to post a review!')
        }

    };

    return (
        <div className={`w-full  ${ui ? "" : "md:px-62 p-6"} mx-auto  space-y-8`}>
            {/* Review Form */}
            <div className="bg-white rounded-2xl shadow border border-gray-300 p-6">
                <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />

                    {/* Rating */}
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                                key={star}
                                className={`cursor-pointer text-xl ${form.rating >= star
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                    }`}
                                onClick={() => setForm({ ...form, rating: star })}
                            />
                        ))}
                    </div>

                    <textarea
                        placeholder="Write your review..."
                        className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        // rows="4"
                        value={form.review}
                        onChange={(e) => setForm({ ...form, review: e.target.value })}
                    />

                    <button
                        type="submit"
                        disabled={!form.name || !form.rating || !form.review}
                        className={`
                                px-6 py-2 rounded-lg transition
                                ${!form.name || !form.rating || !form.review
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                            }
  `}
                    >
                        Submit Review
                    </button>

                </form>
            </div>

            {/* Reviews List */}
            {loader ?
                <div className="w-full h-[200px] flex justify-center items-center">
                    <Spin size="large" />
                </div>
                : <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Reviews</h2>
                    {data?.length > 0 ?
                        data?.map((review: any, index: any) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-lg p-5 space-y-2 border border-gray-400"
                            >
                                <div className="flex justify-between items-center">
                                    <h3 className="font-semibold">{review.name}</h3>
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <FaStar
                                                key={star}
                                                className={`text-sm ${review.rating >= star
                                                    ? "text-yellow-400"
                                                    : "text-gray-300"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-600">{review.review}</p>
                            </div>
                        )) :
                        < div className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-8 text-center">
                            <p className="text-gray-500 text-lg font-medium">
                                No reviews to show
                            </p>
                            <p className="text-gray-400 text-sm mt-1">
                                Be the first one to leave a review ⭐
                            </p>
                        </div>
                    }

                </div>}
        </div >
    );
}
