import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { ShoppingCart, ArrowLeft, Star, ShieldCheck, Truck } from "lucide-react";
import toast from "react-hot-toast";

export default function ProductDetails({ onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await API.get(`/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        toast.error("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090B] flex items-center justify-center text-white">
        <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#09090B] text-white flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-bold">Product Not Found</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-2 bg-violet-600 rounded-xl font-semibold hover:bg-violet-700 transition"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090B] text-white pt-28 pb-20 px-6 max-w-7xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition mb-8 group"
      >
        <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" /> Back
      </button>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Product Image Frame */}
        <div className="rounded-3xl overflow-hidden bg-zinc-900/80 border border-white/10 aspect-square p-6 sm:p-10 flex items-center justify-center relative group shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/10 via-transparent to-fuchsia-600/10 opacity-50 pointer-events-none" />
          <img
            src={product.image || "https://via.placeholder.com/600"}
            alt={product.name}
            className="w-full h-full object-contain max-h-[500px] drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <span className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
            {product.category || "General"}
          </span>

          <h1 className="text-4xl sm:text-5xl font-black">{product.name}</h1>

          <div className="flex items-center gap-3">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            </div>
            <span className="text-sm text-zinc-400">5.0 (Customer Rating)</span>
          </div>

          <p className="text-3xl font-black bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            ${Number(product.price).toFixed(2)}
          </p>

          <p className="text-zinc-400 text-base leading-relaxed">
            {product.description}
          </p>

          {/* Add to Cart CTA */}
          <button
            onClick={() => {
              onAddToCart(product);
              toast.success(`${product.name} added to cart!`);
            }}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 font-bold rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-violet-500/25 hover:opacity-95 active:scale-95 transition-all"
          >
            <ShoppingCart size={20} /> Add to Cart
          </button>

          {/* Perks */}
          <div className="pt-6 border-t border-white/10 grid grid-cols-2 gap-4 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <Truck size={18} className="text-violet-400" /> Fast Delivery
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-fuchsia-400" /> Secure Checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}