import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function AboutMe() {
  const [profile, setProfile] = useState(null);
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const imageFile = watch("image");

  // Image preview
  React.useEffect(() => {
    if (imageFile && imageFile[0]) {
      setPreview(URL.createObjectURL(imageFile[0]));
    }
  }, [imageFile]);

  const onSubmit = (data) => {
    const newProfile = {
      name: data.name,
      about: data.about,
      email: data.email,
      phone: data.phone,
      image: URL.createObjectURL(data.image[0]),
    };

    setProfile(newProfile);

    reset();
    setPreview(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* FORM */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-3xl font-bold text-center mb-6">About Me</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            placeholder="Your Name"
            {...register("name", { required: "Name required" })}
            className="w-full border p-2 rounded"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          {/* About */}
          <textarea
            placeholder="Write About Yourself..."
            {...register("about", { required: "About required" })}
            className="w-full border p-2 rounded"
            rows="5"
          />
          {errors.about && (
            <p className="text-red-500">{errors.about.message}</p>
          )}

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email required" })}
            className="w-full border p-2 rounded"
          />

          {/* Phone */}
          <input
            type="text"
            placeholder="Phone Number"
            {...register("phone", { required: "Phone required" })}
            className="w-full border p-2 rounded"
          />

          {/* Image */}
          <input
            type="file"
            {...register("image", { required: "Image required" })}
          />
          {errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
          )}

          {/* Preview */}
          {preview && (
            <img src={preview} className="w-full h-48 object-cover rounded" />
          )}

          <button className="w-full bg-blue-500 text-white py-2 rounded">
            Save About
          </button>
        </form>
      </div>

      {/* DISPLAY SECTION */}
      {profile && (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            {/* Image */}
            <img
              src={profile.image}
              className="w-60 h-60 object-cover rounded-lg"
            />

            {/* Content */}
            <div>
              <h2 className="text-2xl font-bold mb-2">{profile.name}</h2>

              <p className="text-gray-600 mb-4">{profile.about}</p>

              <p>
                <strong>Email:</strong> {profile.email}
              </p>
              <p>
                <strong>Phone:</strong> {profile.phone}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
