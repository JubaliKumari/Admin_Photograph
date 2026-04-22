"use client";
import { useState } from "react";
import { Plus, X, ImageIcon } from "lucide-react";
import { createLifeStyle } from "@/api/endpoints";
import axios from "axios";

export default function LifeStyle() {
  const [images, setImages] = useState([]);
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    const updated = [...images];
    updated.splice(index, 1);
    setImages(updated);
  };

  const handleSubmit = async () => {
    try {
      if (!heading) return alert("Enter heading");
      if (images.length === 0) return alert("Upload images");

      const formData = new FormData();

      formData.append("heading", heading);
      formData.append("description", description);

      // append multiple images
      images.forEach((img) => {
        formData.append("images", img.file);
        // backend should use "images" as array field
      });

      const res = await axios.post(createLifeStyle, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res.data);

      alert("Saved ✅");

      // reset form
      setHeading("");
      setDescription("");
      setImages([]);
    } catch (error) {
      console.error(error);
      alert("Upload failed ❌");
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

        {/* Heading Input */}
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

        {/* Description Input */}
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

        {/* Upload Button */}
        <label className="flex items-center justify-center gap-2 border-2 border-dashed border-blue-300 text-blue-600 py-6 rounded-xl cursor-pointer hover:bg-blue-50 transition mb-8">
          <Plus />
          Click to Upload Images
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
        </label>

        {/* Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {images.length === 0 && (
            <p className="col-span-full text-center text-gray-400">
              No images uploaded
            </p>
          )}

          {images.map((img, index) => (
            <div
              key={index}
              className="relative group rounded-xl overflow-hidden shadow"
            >
              <img
                src={img.preview}
                className="w-full h-36 object-cover group-hover:scale-105 transition"
              />

              <button
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Save Button */}
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
