import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { MdAdd } from "react-icons/md";
import { createImage } from "../api/endpoints";

import axios from "axios";

export default function AddPostForm() {
  const [posts, setPosts] = useState([]);
  const [prev, setPrev] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("heading", data.heading);
      formData.append("description", data.description);
      formData.append("image", data.image[0]); // important

      const res = await axios.post(createImage, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        const newPost = {
          heading: res.data.data.heading,
          description: res.data.data.description,
          image: res.data.data.image, // ✅ backend image URL
        };

        setPosts((prev) => [...prev, newPost]);

        reset();
        setPrev([]);
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen dark:bg-gray-600 text-gray-800 dark:text-white bg-gray-100 p-6">
      {/* FORM */}
      <div className="w-full max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-2xl dark:bg-gray-500 text-gray-800 dark:text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Create New Post</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid md:grid-cols-2 gap-4"
        >
          {/* Heading */}
          <div>
            <label className="block mb-1 font-medium">Heading</label>
            <input
              type="text"
              {...register("heading", { required: "Heading is required" })}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.heading && (
              <p className="text-red-500 dark:text-red-400 text-sm">
                {errors.heading.message}
              </p>
            )}
          </div>

          {/* Image */}
          <div>
            <label className="flex flex-col items-center gap-4 mb-1 font-medium">
              Upload Image
              {/* Image div - conditional render */}
              <div className="size-32 border rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 overflow-hidden relative group">
                {prev.url ? (
                  <>
                    <img
                      src={prev.url}
                      alt="preview"
                      className="w-full h-full object-cover "
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300">
                      <span className="flex justify-center items-center h-full font-bold text-5xl">
                        <MdAdd />
                      </span>
                    </div>
                  </>
                ) : (
                  <span className="flex justify-center items-center h-full font-bold text-5xl">
                    <MdAdd />
                  </span>
                )}
              </div>
              {/* Input - put onChange INSIDE register using react-hook-form's onChange merge */}
              <input
                className="hidden"
                type="file"
                accept="image/*"
                {...register("image", {
                  required: "Image is required",
                  onChange: (e) => {
                    // 👈 onChange inside register — no conflict
                    const file = e.target.files[0];
                    if (!file) return;
                    const url = URL.createObjectURL(file);
                    if (file.type.startsWith("image/")) {
                      setPrev({ type: "image", url });
                    } else {
                      setPrev({ type: "other", name: file.name });
                    }
                  },
                })}
              />
              {errors.image && (
                <p className="text-red-500 dark:text-red-400 text-sm">
                  {errors.image.message}
                </p>
              )}
            </label>
          </div>

          {/* Description (Full width) */}
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full px-4 py-2 border rounded-lg"
              rows="3"
            />
            {errors.description && (
              <p className="text-red-500 dark:text-red-400 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg hover:bg-blue-600"
            >
              Add Post
            </button>
          </div>
        </form>
      </div>

      {/* POSTS GRID */}
      <div className="max-w-6xl mx-auto mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            No posts added yet
          </p>
        ) : (
          posts.map((post, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-xl shadow  hover:shadow-xl transition dark:bg-gray-500"
            >
              <img
                src={post.image}
                alt="preview"
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-lg font-bold mt-3">{post.heading}</h3>
              <p className="text-gray-600 text-sm dark:text-gray-300">
                {post.description}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
