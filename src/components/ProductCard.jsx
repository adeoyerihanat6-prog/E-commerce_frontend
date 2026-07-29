import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  ShoppingCart,
  Star,
  Trash2,
  Tag,
  Eye
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({
  product,
  onAddToCart,
  onDeleteProduct,
}) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();

  // Safely parse user from localStorage
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const isAdmin = user?.role === "Admin";

  // Navigate to product details page
  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4 }}
      onClick={handleCardClick}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/80 shadow-xl transition-all duration-500 hover:border-violet-500/40 hover:shadow-2xl hover:shadow-violet-500/10 flex flex-col justify-between cursor-pointer"
    >
      {/* Top Image Container */}
      <div className="relative overflow-hidden bg-zinc-800 aspect-square">
        {/* Admin Delete Action */}
        {isAdmin && (
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevents navigating to product page when deleting
              onDeleteProduct(product._id);
            }}
            className="absolute left-4 top-4 z-30 rounded-xl bg-red-500/80 hover:bg-red-600 backdrop-blur-md p-2 text-white transition hover:scale-105"
            title="Delete Product"
          >
            <Trash2 size={16} />
          </button>
        )}

        {/* Wishlist Toggle Button */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevents navigating to product page when favoriting
            setIsWishlisted(!isWishlisted);
          }}
          className={`absolute right-4 top-4 z-30 rounded-full p-2.5 backdrop-blur-md transition-all duration-300 ${
            isWishlisted
              ? "bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-500/30"
              : "bg-black/40 text-white hover:bg-violet-600 hover:scale-110"
          }`}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
        </button>

        {/* Category Badge */}
        <div className="absolute left-4 bottom-4 z-20 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-zinc-300 backdrop-blur-md border border-white/10">
          <Tag size={12} className="text-violet-400" />
          {product.category || "General"}
        </div>

        {/* Product Image */}
        <img
          src={product.image || "https://via.placeholder.com/400"}
          alt={product.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />

        {/* Quick View Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md border border-white/20 shadow-lg">
            <Eye size={14} /> Quick View
          </span>
        </div>
      </div>

      {/* Card Body Details */}
      <div className="space-y-4 p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Rating & Price Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-yellow-400">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={14}
                  fill="currentColor"
                  className="text-yellow-400"
                />
              ))}
              <span className="ml-1 text-xs font-medium text-zinc-400">
                5.0
              </span>
            </div>

            <span className="text-2xl font-black bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              ${Number(product.price).toFixed(2)}
            </span>
          </div>

          {/* Product Name */}
          <h2 className="line-clamp-1 text-lg font-bold text-white transition group-hover:text-violet-400">
            {product.name}
          </h2>

          {/* Description */}
          <p className="line-clamp-2 text-sm leading-relaxed text-zinc-400">
            {product.description}
          </p>
        </div>

        {/* Add to Cart CTA Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          onClick={(e) => {
            e.stopPropagation(); // Prevents opening product page when clicking "Add to Cart"
            onAddToCart(product);
          }}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:shadow-violet-500/40 active:scale-95 z-10"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
}