import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { UploadCloud, PackagePlus, ArrowLeft, X } from "lucide-react";

export default function AddProduct() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Living",
    "Beauty",
    "Phones",
    "Computers",
    "Gaming",
    "Sports",
    "Books",
    "Food",
    "Automotive",
    "Accessories",
    "Health",
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      return setError("Please choose a product image.");
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("countInStock", countInStock);
    formData.append("image", image);

    try {
      await API.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center px-5 py-28 relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute w-96 h-96 bg-violet-700/20 blur-[150px] rounded-full top-20 left-10 pointer-events-none" />
      <div className="absolute w-96 h-96 bg-fuchsia-600/20 blur-[150px] rounded-full bottom-20 right-10 pointer-events-none" />

      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-zinc-900/70 backdrop-blur-xl p-8 md:p-10 shadow-2xl z-10"
      >
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition mb-6"
        >
          <ArrowLeft size={16} />
          Back to Store
        </Link>

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 flex items-center justify-center text-white shadow-lg shadow-violet-500/30">
            <PackagePlus size={28} />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-white tracking-wide">
              Add Product
            </h2>
            <p className="text-zinc-400 text-sm mt-0.5">
              Publish a new item to your store catalog.
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        <div className="space-y-5">
          {/* Product Name */}
          <div>
            <label className="block text-xs text-zinc-400 mb-2 font-medium">
              Product Title
            </label>
            <input
              type="text"
              placeholder="e.g. Wireless Noise-Canceling Headphones"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-2xl bg-zinc-800/80 border border-white/10 px-5 py-3.5 text-white placeholder:text-zinc-500 outline-none focus:border-violet-500 transition"
            />
          </div>

          {/* Price & Stock Grid */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs text-zinc-400 mb-2 font-medium">
                Price ($USD)
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="w-full rounded-2xl bg-zinc-800/80 border border-white/10 px-5 py-3.5 text-white placeholder:text-zinc-500 outline-none focus:border-violet-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-2 font-medium">
                Stock Quantity
              </label>
              <input
                type="number"
                placeholder="10"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                required
                className="w-full rounded-2xl bg-zinc-800/80 border border-white/10 px-5 py-3.5 text-white placeholder:text-zinc-500 outline-none focus:border-violet-500 transition"
              />
            </div>
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-xs text-zinc-400 mb-2 font-medium">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-2xl bg-zinc-800/80 border border-white/10 px-5 py-3.5 text-white outline-none focus:border-violet-500 transition cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-zinc-900 text-white">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs text-zinc-400 mb-2 font-medium">
              Description
            </label>
            <textarea
              rows={4}
              placeholder="Provide details about specs, dimensions, or features..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full rounded-2xl bg-zinc-800/80 border border-white/10 px-5 py-3.5 text-white placeholder:text-zinc-500 outline-none resize-none focus:border-violet-500 transition"
            />
          </div>

          {/* Image Upload Area */}
          <div>
            <label className="block text-xs text-zinc-400 mb-2 font-medium">
              Product Image
            </label>

            {imagePreview ? (
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-800 p-2 flex items-center gap-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded-xl"
                />
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-medium text-white truncate">
                    {image?.name}
                  </p>
                  <p className="text-xs text-zinc-400">
                    {(image?.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={removeImage}
                  className="p-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition mr-2"
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-white/15 bg-zinc-800/40 p-8 cursor-pointer hover:border-violet-500 hover:bg-zinc-800/70 transition">
                <UploadCloud size={32} className="text-violet-400" />
                <div className="text-center">
                  <span className="text-sm text-zinc-300 font-medium block">
                    Click to upload product image
                  </span>
                  <span className="text-xs text-zinc-500 mt-1 block">
                    PNG, JPG, or WEBP up to 5MB
                  </span>
                </div>
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-4 text-base font-semibold text-white hover:scale-[1.01] transition shadow-lg shadow-violet-600/20 active:scale-95 disabled:opacity-50"
          >
            {loading ? "Publishing Product..." : "Publish Product"}
          </button>
        </div>
      </form>
    </div>
  );
}