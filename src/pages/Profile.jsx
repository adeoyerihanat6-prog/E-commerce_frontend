import { useEffect, useState } from 'react';
import API from '../api/axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Shield, 
  ShoppingBag, 
  Calendar, 
  ChevronDown, 
  Loader2, 
  Package,
  Clock,
  CheckCircle2,
  Truck
} from 'lucide-react';

export default function Profile() {
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const response = await API.get('/orders/my-orders');
        setMyOrders(response.data);
      } catch (err) {
        console.error('Failed to load user orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, []);

  const toggleOrderExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return {
          color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
          icon: <CheckCircle2 size={14} />
        };
      case 'Shipped':
        return {
          color: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
          icon: <Truck size={14} />
        };
      case 'Processing':
        return {
          color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
          icon: <Clock size={14} />
        };
      default:
        return {
          color: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
          icon: <Clock size={14} />
        };
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-white pt-28 pb-20 px-6 relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute w-96 h-96 bg-violet-700/15 blur-[150px] rounded-full top-10 left-10 pointer-events-none" />
      <div className="absolute w-96 h-96 bg-fuchsia-600/15 blur-[150px] rounded-full bottom-10 right-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* User Info Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-white/10 bg-zinc-900/70 backdrop-blur-xl p-8 shadow-2xl mb-10 flex flex-col sm:flex-row items-center gap-6"
        >
          {/* Avatar */}
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-violet-600 to-fuchsia-600 text-white font-black text-3xl flex items-center justify-center shadow-lg shadow-violet-500/30 border border-white/20">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>

          {/* Details */}
          <div className="text-center sm:text-left space-y-1 flex-1">
            <h1 className="text-3xl font-bold tracking-tight">{user?.name || 'User Profile'}</h1>
            
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-zinc-400 pt-1">
              <span className="flex items-center gap-1.5">
                <Mail size={16} className="text-violet-400" />
                {user?.email}
              </span>
              
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-zinc-300">
                <Shield size={12} className="text-fuchsia-400" />
                Role: {user?.role || 'Customer'}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Order History Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400">
              <ShoppingBag size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">My Order History</h2>
              <p className="text-xs text-zinc-400">View and track your previous purchases</p>
            </div>
          </div>
          <span className="text-xs text-zinc-500">{myOrders.length} total orders</span>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
            <Loader2 size={32} className="animate-spin text-violet-500 mb-3" />
            <p className="text-sm">Loading your purchase history...</p>
          </div>
        )}

        {/* Orders List */}
        {!loading && (
          <div className="space-y-4">
            {myOrders.length > 0 ? (
              myOrders.map((order) => {
                const badge = getStatusBadge(order.status || 'Pending');
                const isExpanded = expandedOrder === order._id;

                return (
                  <motion.div
                    key={order._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-white/10 bg-zinc-900/80 backdrop-blur-md shadow-xl overflow-hidden"
                  >
                    {/* Order Summary Row */}
                    <div 
                      onClick={() => toggleOrderExpand(order._id)}
                      className="p-6 flex flex-wrap items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02] transition"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-violet-400 font-semibold">
                            Order #{order._id.slice(-6)}
                          </span>
                          <span className="text-xs text-zinc-500 flex items-center gap-1">
                            <Calendar size={12} />
                            {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-2xl font-black bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                          ${order.totalAmount?.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${badge.color}`}>
                          {badge.icon}
                          {order.status || 'Pending'}
                        </span>

                        <div className={`p-2 rounded-xl bg-zinc-800 text-zinc-400 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-white' : ''}`}>
                          <ChevronDown size={18} />
                        </div>
                      </div>
                    </div>

                    {/* Order Items Dropdown Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t border-white/5 bg-zinc-950/50 p-6 space-y-3"
                        >
                          <p className="text-xs font-medium text-zinc-400 mb-2 flex items-center gap-2">
                            <Package size={14} /> Purchased Items ({order.products?.length || 0})
                          </p>
                          
                          {order.products?.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between gap-4 p-3 rounded-xl bg-zinc-900/60 border border-white/5">
                              <div className="flex items-center gap-3 min-w-0">
                                {item.product?.image && (
                                  <img 
                                    src={item.product.image} 
                                    alt={item.product.name} 
                                    className="w-12 h-12 object-cover rounded-lg border border-white/5 bg-zinc-800"
                                  />
                                )}
                                <div className="min-w-0">
                                  <p className="text-sm font-semibold text-white truncate">
                                    {item.product?.name || 'Product Item'}
                                  </p>
                                  <p className="text-xs text-zinc-400">
                                    Qty: {item.quantity} × ${item.product?.price || '0.00'}
                                  </p>
                                </div>
                              </div>
                              <span className="text-sm font-bold text-zinc-300">
                                ${( (item.product?.price || 0) * item.quantity ).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <div className="rounded-3xl border border-white/10 bg-zinc-900/70 backdrop-blur-xl p-12 text-center text-zinc-500">
                <Package size={48} className="mx-auto text-zinc-600 mb-4" />
                <h3 className="text-lg font-semibold text-white">No orders found</h3>
                <p className="text-sm text-zinc-400 mt-1">
                  You haven't placed any orders yet. Start shopping to fill up your history!
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}