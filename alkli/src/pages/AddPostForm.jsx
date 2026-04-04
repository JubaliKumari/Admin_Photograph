import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function AddPostForm() {
  const [posts, setPosts] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const newPost = {
      ...data,
      image: URL.createObjectURL(data.image[0]),
    };

    setPosts((prev) => [...prev, newPost]);
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* FORM */}
      <div className="w-full max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
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
              <p className="text-red-500 text-sm">{errors.heading.message}</p>
            )}
          </div>

          {/* Image */}
          <div>
            <label className="block mb-1 font-medium">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: "Image is required" })}
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}
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
              <p className="text-red-500 text-sm">
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
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              <img
                src={post.image}
                alt="preview"
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-lg font-bold mt-3">{post.heading}</h3>
              <p className="text-gray-600 text-sm">{post.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
