"use client";
import { useState } from "react";
import { Plus, X, ImageIcon } from "lucide-react";
import axios from "axios";
import { createCorporate } from "@/api/endpoints";

export default function CorporateGallery() {
  const [images, setImages] = useState([]);
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

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
    URL.revokeObjectURL(updated[index].preview);
    updated.splice(index, 1);
    setImages(updated);
  };

  const handleSubmit = async () => {
    if (!heading.trim()) return alert("Please enter heading");
    if (!description.trim()) return alert("Please enter description");
    if (images.length === 0) return alert("Please upload at least one image");

    setLoading(true);

    const formData = new FormData();
    formData.append("heading", heading);
    formData.append("description", description);

    // ✅ Changed to "image" (most common with Multer for galleries)
    // Try this first. If it still fails, change back to "images"
    images.forEach((img) => {
      formData.append("image", img.file);
    });

    try {
      const response = await axios.post(createCorporate, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          console.log(`Upload Progress: ${percent}%`);
        },
      });

      console.log("✅ Success:", response.data);
      alert("Gallery saved successfully! ✅");

      // Reset form
      setHeading("");
      setDescription("");
      setImages([]);
    } catch (error) {
      console.error("❌ Upload Error:", error.response?.data || error.message);

      if (
        error.response?.data?.includes("Unexpected field") ||
        error.response?.status === 500
      ) {
        alert(
          "Field name mismatch. Try changing 'image' to 'images' in the code.",
        );
      } else {
        alert(
          error.response?.data?.message ||
            "Failed to save gallery. Please try again.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
          <ImageIcon className="text-blue-600" size={32} />
          Corporate Gallery Manager
        </h1>

        {/* Heading */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Gallery Heading <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            placeholder="Enter gallery title (e.g., Our Office Events)"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-lg"
          />
        </div>

        {/* Description */}
        <div className="mb-8">
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a short description about this gallery..."
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-y"
          />
        </div>

        {/* Upload Area */}
        <label className="flex items-center justify-center gap-3 border-2 border-dashed border-blue-300 text-blue-600 py-8 rounded-2xl cursor-pointer hover:bg-blue-50 hover:border-blue-400 transition-all mb-8">
          <Plus size={28} />
          <div className="text-center">
            <p className="font-semibold text-lg">Click to Upload Images</p>
            <p className="text-sm text-gray-500 mt-1">
              PNG, JPG, JPEG • Multiple allowed
            </p>
          </div>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
        </label>

        {/* Image Preview Grid */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-gray-600 mb-3">
            Uploaded Images ({images.length})
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {images.length === 0 && (
              <p className="col-span-full text-center py-12 text-gray-400 text-lg">
                No images uploaded yet
              </p>
            )}

            {images.map((img, index) => (
              <div
                key={index}
                className="relative group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
              >
                <img
                  src={img.preview}
                  alt="preview"
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-3 right-3 bg-black/70 hover:bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3.5 rounded-2xl font-semibold shadow-lg transition flex items-center gap-2"
          >
            {loading ? "Saving..." : "Save Gallery"}
          </button>
        </div>
      </div>
    </div>
  );
}
