"use client";
import { useState } from "react";
import { Plus, X, ImageIcon } from "lucide-react";
import { createTravelling } from "../api/endpoints";
import axios from "axios";

export default function Travelling() {
  const [image, setImage] = useState(null);
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");

  // ✅ Upload single image
  const handleUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage({
        file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  // ✅ Remove image
  const removeImage = () => {
    setImage(null);
  };

  // ✅ Submit
  // const handleSubmit = async () => {
  //   if (!heading) return alert("Enter heading");
  //   if (!image) return alert("Upload image");

  //   const formData = new FormData();
  //   formData.append("heading", heading);2
  //   formData.append("description", description);
  //   formData.append("image", image.file); // ✅ FIX HERE

  //   try {
  //     const response = await axios.post(createTravelling, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     console.log(response.data);
  //     alert("Saved ✅");
  //   } catch (error) {
  //     console.log(error.response?.data); // 👈 VERY IMPORTANT
  //   }
  // };

  const handleSubmit = async () => {
    if (!heading.trim()) return alert("Please enter heading");
    if (!image?.file) return alert("Please upload an image");
    const formData = new FormData();

    formData.append("heading", heading);
    formData.append("description", description);

    formData.append("image", image.file);

    try {
      const response = await axios.post(createTravelling, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        // Optional: show upload progress
        onUploadProgress: (progressEvent) => {
          console.log(
            "Upload progress:",
            Math.round((progressEvent.loaded * 100) / progressEvent.total),
          );
        },
      });

      console.log("✅ Success:", response.data);
      alert("Saved successfully!");

      // Reset form
      setHeading("");
      setDescription("");
      setImage(null);
    } catch (error) {
      console.error("❌ Upload Error:", error.response?.data || error.message);
      alert(
        error.response?.data?.error || "Failed to upload image. Check console.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <ImageIcon className="text-blue-600" />
          Gallery Manager
        </h1>

        {/* Heading */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-semibold text-gray-600">
            Heading
          </label>
          <input
            type="text"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            placeholder="Enter gallery title"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-semibold text-gray-600">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter gallery description"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            rows={4}
          />
        </div>

        {/* Upload */}
        <label className="flex items-center justify-center gap-2 border-2 border-dashed border-blue-300 text-blue-600 py-6 rounded-xl cursor-pointer hover:bg-blue-50 transition mb-6">
          <Plus />
          Click to Upload Image
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
        </label>

        {/* Preview */}
        <div className="mt-4">
          {!image ? (
            <p className="text-center text-gray-400">No image uploaded</p>
          ) : (
            <div className="relative w-48 h-40 mx-auto rounded-xl overflow-hidden shadow">
              <img
                src={image.preview}
                alt="preview"
                className="w-full h-full object-cover"
              />

              <button
                onClick={removeImage}
                className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow"
          >
            Save Gallery
          </button>
        </div>
      </div>
    </div>
  );
}
