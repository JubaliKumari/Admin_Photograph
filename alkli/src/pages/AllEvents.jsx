import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdAdd, MdPhotoLibrary } from "react-icons/md";
import { createEvent } from "../api/endpoints";
import axios from "axios";

export default function AllEvents() {
  const [posts, setPosts] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("heading", data.heading);
    console.log("Form Data Heading:", data.heading);

    // 🔥 Backend expects 'image' (singular)
    if (data.images && data.images.length > 0) {
      formData.append("image", data.images[0]); // ✅ singular
    }
    console.log("Form Data Images:", data.images);

    try {
      const response = await axios.post(createEvent, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        const serverData = response.data.data;

        const newPost = {
          heading: serverData.heading,
          // Using local URL for immediate display
          images: [URL.createObjectURL(data.images[0])],
          _id: serverData._id,
        };

        setPosts((prev) => [newPost, ...prev]);
        setPreviewImages([]);
        reset();
        alert("Event Created Successfully! 🎉");
      }
    } catch (error) {
      console.error("API Error:", error.response?.data);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white p-6">
      {/* --- FORM SECTION --- */}
      <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
        <h2 className="text-3xl font-extrabold mb-8 text-center bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Create Portfolio Post
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Post Heading
                </label>
                <input
                  type="text"
                  placeholder="E.g. Summer Wedding 2024"
                  {...register("heading", { required: "Heading is required" })}
                  className="w-full px-4 py-3 rounded-xl border dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
                {errors.heading && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.heading.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-2">
                Gallery Images
              </label>
              <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-700 transition relative overflow-hidden group min-h-[150px]">
                {previewImages.length > 0 ? (
                  <div className="grid grid-cols-2 w-full h-full p-2 gap-1">
                    {previewImages.slice(0, 4).map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        className="w-full h-full object-cover rounded-md"
                        alt="preview"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center">
                    <MdPhotoLibrary className="text-5xl text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">
                      Click to upload photo
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...register("images", {
                    required: "Image is required",
                    onChange: (e) => {
                      handleImageChange(e); // preview
                    },
                  })}
                />
              </label>
              {errors.images && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.images.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 rounded-xl font-bold text-lg transition ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
            }`}
          >
            {isSubmitting ? "Publishing..." : "Publish Post"}
          </button>
        </form>
      </div>

      {/* --- POSTS DISPLAY GRID (Heading & Image Only) --- */}
      <div className="max-w-7xl mx-auto mt-16 px-4">
        <div className="flex items-center justify-between mb-8 border-b pb-4 border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold">Portfolio Gallery</h2>
          <span className="text-gray-500 text-sm">{posts.length} Items</span>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg italic">No items yet 🚀</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <article
                key={index}
                className="group bg-white dark:bg-gray-800 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
              >
                {/* Image Showcase */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={post.images[0]}
                    alt={post.heading}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content: Heading Only */}
                <div className="p-5 text-center">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
                    {post.heading}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
