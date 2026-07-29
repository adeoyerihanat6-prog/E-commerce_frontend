import React, { useState } from 'react';
import API from '../api/axios';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Loader2, LogIn } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function CartDrawer({ isOpen, onClose, cart = [], setCart }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  // Dynamically check token on render so it's always up-to-date
  const token = localStorage.getItem("token");

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item._id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    // 1. CHECK IF USER IS LOGGED IN
    if (!token) {
      onClose(); // Close cart modal
      // Redirect to login and save current path
      navigate("/login", { state: { redirectTo: "/" } });
      return;
    }

    // 2. IF LOGGED IN, PROCESS ORDER
    setLoading(true);

    try {
      const orderPayload = {
        products: cart.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
        totalAmount,
      };

      await API.post('/orders', orderPayload);
      alert('🎉 Order placed successfully!');
      setCart([]);
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to place order. Please try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-screen max-w-md bg-[#09090B] border-l border-white/10 text-white shadow-2xl flex flex-col relative"
        >
          {/* Glow effect */}
          <div className="absolute w-72 h-72 bg-violet-600/10 blur-[120px] rounded-full top-0 right-0 pointer-events-none" />

          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400">
                <ShoppingBag size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold">Your Cart</h2>
                <p className="text-xs text-zinc-400">
                  {cart.length} {cart.length === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white rounded-xl bg-white/5 hover:bg-white/10 transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 relative z-10 no-scrollbar">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 rounded-3xl bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-500 mb-4">
                  <ShoppingBag size={36} />
                </div>
                <h3 className="text-lg font-semibold text-white">Your cart is empty</h3>
                <p className="text-sm text-zinc-500 mt-1 max-w-xs">
                  Looks like you haven't added anything to your cart yet.
                </p>
              </div>
            ) : (
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={item._id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex gap-4 p-3.5 bg-zinc-900/80 rounded-2xl border border-white/10 items-center relative group"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-xl border border-white/5 bg-zinc-800"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-white truncate">{item.name}</h4>
                      <p className="text-xs font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mt-0.5">
                        ${item.price}
                      </p>

                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center gap-2 rounded-lg bg-zinc-800 border border-white/10 p-1">
                          <button
                            onClick={() => handleQuantity(item._id, -1)}
                            className="w-5 h-5 rounded flex items-center justify-center hover:bg-white/10 text-zinc-300 transition"
                          >
                            <Minus size={12} />
                          </button>

                          <span className="text-xs font-semibold px-1 min-w-[16px] text-center">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => handleQuantity(item._id, 1)}
                            className="w-5 h-5 rounded flex items-center justify-center hover:bg-white/10 text-zinc-300 transition"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item._id)}
                          className="p-1.5 text-zinc-500 hover:text-red-400 transition"
                          title="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          {/* Footer Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-zinc-900/60 backdrop-blur-xl space-y-4 relative z-10">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Shipping</span>
                  <span className="text-emerald-400">Calculated at checkout</span>
                </div>
                <div className="flex justify-between items-center text-white font-bold text-base pt-2 border-t border-white/5">
                  <span>Total</span>
                  <span className="text-xl bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Guest Banner Notice */}
              {!token && (
                <p className="text-xs text-center text-violet-300 bg-violet-500/10 border border-violet-500/20 py-2 px-3 rounded-xl">
                  🔒 You will need to sign in to place this order
                </p>
              )}

              {/* Dynamic Button Action */}
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:scale-[1.01] active:scale-95 text-white font-semibold py-4 rounded-2xl transition duration-200 flex items-center justify-center gap-2 shadow-lg shadow-violet-500/20 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Processing Order...</span>
                  </>
                ) : token ? (
                  <>
                    <span>Checkout Now</span>
                    <ArrowRight size={18} />
                  </>
                ) : (
                  <>
                    <LogIn size={18} />
                    <span>Sign In to Checkout</span>
                  </>
                )}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}