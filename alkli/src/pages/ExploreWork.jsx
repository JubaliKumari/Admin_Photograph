import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function ExploreWork() {
  const [posts, setPosts] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const imageFile = watch("image");
  const [preview, setPreview] = useState(null);

  React.useEffect(() => {
    if (imageFile && imageFile[0]) {
      setPreview(URL.createObjectURL(imageFile[0]));
    }
  }, [imageFile]);

  const onSubmit = (data) => {
    const newPost = {
      heading: data.heading,
      image: URL.createObjectURL(data.image[0]),
    };

    setPosts((prev) => [...prev, newPost]);

    reset();
    setPreview(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* FORM */}
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold text-center mb-4">Add Work</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Heading"
            {...register("heading", { required: "Heading required" })}
            className="w-full border p-2 rounded"
          />
          {errors.heading && (
            <p className="text-red-500">{errors.heading.message}</p>
          )}

          <input
            type="file"
            {...register("image", { required: "Image required" })}
          />
          {errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
          )}

          {preview && (
            <img src={preview} className="w-full h-40 object-cover rounded" />
          )}

          <button className="w-full bg-blue-500 text-white py-2 rounded">
            Add
          </button>
        </form>
      </div>

      {/* EXPLORE OUR WORK */}
      <div className="max-w-6xl mx-auto mt-10">
        <h1 className="text-3xl font-bold text-center mb-6">
          Explore Our Work
        </h1>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition"
            >
              <img src={post.image} className="w-full h-48 object-cover" />

              <h2 className="text-center font-semibold p-3">{post.heading}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
