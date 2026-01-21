import React from "react";

export default function BlogSection() {
    const blogs = [
        {
            id: 1,
            title: "How to Build a Modern React App",
            excerpt:
                "Learn best practices for building scalable and maintainable React applications.",
            image:
                "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
            author: "Faizaan Imran",
            date: "Jan 18, 2026"
        },
        {
            id: 2,
            title: "Tailwind CSS Tips & Tricks",
            excerpt:
                "Improve your UI development workflow using Tailwind CSS efficiently.",
            image:
                "https://images.unsplash.com/photo-1517430816045-df4b7de01f17",
            author: "Admin",
            date: "Jan 20, 2026"
        }
    ];

    return (
        <div className="max-w-6xl mx-auto px-6 py-10 mt-4" id="blogs">
            <h2 className="text-3xl font-bold mb-8">Latest Blogs</h2>

            {blogs.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                    <p className="text-lg font-medium">No blogs available</p>
                    <p className="text-sm">Check back later for new posts ✍️</p>
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map((blog) => (
                        <div
                            key={blog.id}
                            className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
                        >
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="h-48 w-full object-cover"
                            />

                            <div className="p-5 space-y-3">
                                <h3 className="text-xl font-semibold line-clamp-2">
                                    {blog.title}
                                </h3>

                                <p className="text-gray-600 text-sm line-clamp-3">
                                    {blog.excerpt}
                                </p>

                                <div className="flex justify-between items-center text-xs text-gray-400">
                                    <span>{blog.author}</span>
                                    <span>{blog.date}</span>
                                </div>

                                <button className="mt-3 inline-block text-sm font-medium text-indigo-600 hover:underline">
                                    Read More →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
