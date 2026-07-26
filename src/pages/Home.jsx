import { useEffect, useState } from 'react';
import API from '../api/axios';
import ProductCard from '../components/ProductCard';
import { motion } from "framer-motion";
import { Search, Sparkles, ArrowRight, ShieldCheck, Truck, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const categories = [
    "All",
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

  const fetchProducts = async () => {
    try {
      const response = await API.get('/products');
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setError('Unable to load products right now.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products when search or category changes
  useEffect(() => {
    let updated = products;

    if (selectedCategory !== 'All') {
      updated = updated.filter(
        (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchQuery.trim() !== '') {
      updated = updated.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(updated);
  }, [searchQuery, selectedCategory, products]);

  // Handle Admin Delete Action
  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await API.delete(`/products/${productId}`);
      setProducts((prev) => prev.filter((p) => p._id !== productId));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete product');
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-white overflow-hidden relative">

      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute w-[500px] h-[500px] bg-violet-600/15 blur-[140px] -top-32 -left-20 rounded-full" />
        <div className="absolute w-[500px] h-[500px] bg-fuchsia-500/10 blur-[160px] top-1/2 right-0 rounded-full" />
      </div>

      {/* HERO SECTION */}
      <section className="relative pt-36 pb-20 px-6 max-w-7xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Hero Content */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300 mb-6 backdrop-blur-md">
              <Sparkles size={16} />
              Premium Shopping Experience
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight">
              Shop{" "}
              <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                Without Limits.
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-zinc-400 text-lg leading-8">
              Discover premium fashion, gadgets, accessories and everything you
              love in one beautiful shopping experience.
            </p>

            {/* Search Input */}
            <div className="relative mt-10 max-w-xl">
              <Search
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
              />

              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-2xl border border-white/10 bg-zinc-900/70 backdrop-blur-xl pl-14 pr-5 py-4 outline-none focus:border-violet-500 transition text-white placeholder:text-zinc-500"
              />
            </div>
          </div>

          {/* Right Floating Banner Image */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-violet-500 blur-[120px] opacity-30" />
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900"
                alt="Hero"
                className="relative w-[480px] rounded-[40px] border border-white/10 shadow-2xl object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* FEATURE HIGHLIGHTS */}
      <section className="relative max-w-7xl mx-auto px-6 py-8 z-10 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-3xl border border-white/10 bg-zinc-900/50 backdrop-blur-md p-8 hover:border-violet-500/40 transition-colors duration-300">
            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-5">
              <Truck size={24} />
            </div>
            <h3 className="text-xl font-bold">Fast Delivery</h3>
            <p className="text-zinc-400 mt-2 text-sm">
              Receive your orders quickly with our trusted delivery partners.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-zinc-900/50 backdrop-blur-md p-8 hover:border-violet-500/40 transition-colors duration-300">
            <div className="w-12 h-12 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center text-fuchsia-400 mb-5">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold">Secure Payments</h3>
            <p className="text-zinc-400 mt-2 text-sm">
              Shop confidently with encrypted and secure checkout.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-zinc-900/50 backdrop-blur-md p-8 hover:border-violet-500/40 transition-colors duration-300">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 mb-5">
              <Star size={24} />
            </div>
            <h3 className="text-xl font-bold">Premium Products</h3>
            <p className="text-zinc-400 mt-2 text-sm">
              Carefully selected quality products you'll love.
            </p>
          </div>
        </div>
      </section>

      {/* CATEGORIES PILLS */}
      <section id="catalog" className="max-w-7xl mx-auto px-6 z-10 relative">
        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-3 rounded-full transition whitespace-nowrap text-sm font-medium ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/25"
                  : "bg-zinc-900 border border-white/10 text-zinc-400 hover:border-violet-500 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* PRODUCT CATALOG HEADER */}
      <section className="max-w-7xl mx-auto px-6 mt-12 mb-8 flex justify-between items-center z-10 relative">
        <div>
          <h2 className="text-3xl font-bold">
            {selectedCategory === "All" ? "Trending Products" : selectedCategory}
          </h2>
          <p className="text-zinc-500 mt-2">
            {filteredProducts.length} Products Available
          </p>
        </div>
      </section>

      {/* LOADING STATE */}
      {loading && (
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-[420px] rounded-3xl bg-zinc-900/80 border border-white/5 animate-pulse"
            />
          ))}
        </div>
      )}

      {/* ERROR STATE */}
      {error && (
        <div className="max-w-xl mx-auto my-10 rounded-2xl bg-red-500/10 border border-red-500/20 p-6 text-center text-red-300">
          {error}
        </div>
      )}

      {/* PRODUCTS GRID */}
      {!loading && !error && (
        <section className="max-w-7xl mx-auto px-6 pb-24 z-10 relative">
          {filteredProducts.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-zinc-900 p-20 text-center">
              <h3 className="text-2xl font-bold">No Products Found</h3>
              <p className="text-zinc-500 mt-3">
                Try another search or select a different category.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onDeleteProduct={handleDeleteProduct}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* NEWSLETTER BANNER */}
      <section className="max-w-6xl mx-auto px-6 pb-28 z-10 relative">
        <div className="rounded-[40px] overflow-hidden bg-gradient-to-r from-violet-700 to-fuchsia-600 p-12 text-center shadow-2xl shadow-violet-600/20">
          <h2 className="text-4xl font-black">Join the Velora Community</h2>
          <p className="mt-4 text-white/80 max-w-2xl mx-auto">
            Get exclusive discounts, new arrivals and shopping inspiration delivered directly to your inbox.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-white text-black placeholder:text-zinc-400 rounded-2xl px-6 py-4 w-full sm:w-[380px] outline-none"
            />
            <button className="rounded-2xl bg-black text-white px-8 py-4 font-semibold hover:bg-zinc-900 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-10">
            <div>
              <h2 className="text-3xl font-black bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Velora
              </h2>
              <p className="text-zinc-500 mt-4 text-sm leading-relaxed">
                Premium shopping for modern lifestyles.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-white">Shop</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <button
                    onClick={() => setSelectedCategory("Electronics")}
                    className="text-zinc-500 hover:text-violet-400 transition"
                  >
                    Electronics
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setSelectedCategory("Fashion")}
                    className="text-zinc-500 hover:text-violet-400 transition"
                  >
                    Fashion
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setSelectedCategory("Accessories")}
                    className="text-zinc-500 hover:text-violet-400 transition"
                  >
                    Accessories
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setSelectedCategory("Home & Living")}
                    className="text-zinc-500 hover:text-violet-400 transition"
                  >
                    Home & Living
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-white">Company</h4>
              <ul className="space-y-3 text-sm text-zinc-500">
                <li className="hover:text-white transition cursor-pointer">About</li>
                <li className="hover:text-white transition cursor-pointer">Support</li>
                <li className="hover:text-white transition cursor-pointer">Privacy</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-white">Contact</h4>
              <p className="text-zinc-500 text-sm">support@velora.com</p>
            </div>
          </div>

          <div className="mt-16 border-t border-white/10 pt-8 text-center text-xs text-zinc-600">
            © {new Date().getFullYear()} Velora. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}