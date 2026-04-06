import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { MdAdd } from "react-icons/md";


export default function AllEvents() {
  const [posts, setPosts] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Handle image preview
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const onSubmit = (data) => {
    const images = Array.from(data.images).map((file) =>
      URL.createObjectURL(file),
    );

    const newPost = {
      heading: data.heading,
      description: data.description,
      images,
    };

    setPosts((prev) => [...prev, newPost]);
    setPreviewImages([]);
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-white p-6">
      {/* FORM */}
      <div className="w-full max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-2xl dark:bg-gray-500 text-gray-800 dark:text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Create Portfolio Post 📸
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* Heading */}
          <div>
            <label className="block mb-1 font-medium">Heading</label>
            <input
              type="text"
              {...register("heading", { required: "Heading is required" })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            {errors.heading && (
              <p className="text-red-500 text-sm">{errors.heading.message}</p>
            )}
          </div>

          {/* Image */}
                     {/* <label> Upload Photo
                        <div className="h-32 border w-auto my-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 overflow-hidden relative group">
          
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            {...register("images", { required: "Images are required" })}
                            onChange={handleImageChange}
                            className="w-full"
                          />
                          {errors.image && (
                            <p className="text-red-500">{errors.image.message}</p>
                          )}
                          {preview? (<>
                                <img src={preview} alt="preview" className="w-full h-40 object-cover rounded" />
                                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300" ><span className="flex justify-center items-center h-full font-bold text-5xl">
                                  <MdAdd />
                                </span></div>
                              </>) : (
                                <span className="flex justify-center items-center w-full h-full font-bold text-5xl">
                                  <MdAdd />
                                </span>
                              )}
                          </div>
                      </label> */}

          {/* Images */}
          <div>
            <label className="block mb-1 font-medium">Upload Images

              <div className="size-32 my-2 border rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 hover:opacity-50  duration-300" >
                <span className="flex justify-center items-center h-full font-bold text-5xl">
                  <MdAdd />
                </span>
              </div>


            <input
              type="file"
              multiple
              accept="image/*"
              {...register("images", { required: "Images are required" })}
              onChange={handleImageChange}
              className="w-full hidden"
            />
            </label>
          </div>

          {/* Preview */}
          {previewImages.length > 0 && (
            <div className="md:col-span-2 grid grid-cols-3 gap-3">
              {previewImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="preview"
                  className="h-24 w-full object-cover rounded-lg"
                />
              ))}
            </div>
          )}

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
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
              className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg hover:bg-blue-600 transition"
            >
              Add Post
            </button>
          </div>
        </form>
      </div>

      {/* POSTS GRID */}
      <div className="max-w-6xl mx-auto mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6  ">
        {posts.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            No posts yet 🚀
          </p>
        ) : (
          posts.map((post, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow hover:shadow-2xl transition dark:bg-gray-500  overflow-hidden"
            >
              {/* Image Grid */}
              <div className="grid grid-cols-2 gap-1">
                {post.images.slice(0, 4).map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="post"
                    className="h-32 w-full object-cover"
                  />
                ))}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-bold">{post.heading}</h3>
                <p className="text-gray-600 dark:text-gray-100 text-sm mt-1">{post.description}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
