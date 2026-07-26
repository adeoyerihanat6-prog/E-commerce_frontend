import { useEffect, useState } from 'react';
import API from '../api/axios';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  ShoppingBag, 
  Clock, 
  ShieldCheck, 
  Loader2, 
  TrendingUp,
  UserCheck
} from 'lucide-react';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await API.get('/orders/admin/all');
      setOrders(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await API.patch(`/orders/admin/${orderId}/status`, { status: newStatus });
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      alert('Failed to update order status');
    }
  };

  const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Processing':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Shipped':
        return 'bg-violet-500/10 text-violet-400 border-violet-500/20';
      default:
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-white pt-28 pb-20 px-6 relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute w-96 h-96 bg-violet-700/15 blur-[150px] rounded-full top-10 left-10 pointer-events-none" />
      <div className="absolute w-96 h-96 bg-fuchsia-600/15 blur-[150px] rounded-full bottom-10 right-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs text-violet-300 mb-3">
              <ShieldCheck size={14} /> Admin Portal
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight">Dashboard Overview</h1>
            <p className="text-zinc-400 text-sm mt-1">Manage store orders and track real-time revenue.</p>
          </div>
        </div>

        {/* Stats Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          
          {/* Total Revenue */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900/70 border border-white/10 backdrop-blur-xl p-6 rounded-3xl relative overflow-hidden shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Total Revenue</span>
              <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <DollarSign size={20} />
              </div>
            </div>
            <p className="text-3xl font-black text-white">${totalRevenue.toFixed(2)}</p>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-2">
              <TrendingUp size={14} /> Gross sales
            </div>
          </motion.div>

          {/* Total Orders */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-zinc-900/70 border border-white/10 backdrop-blur-xl p-6 rounded-3xl relative overflow-hidden shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Total Orders</span>
              <div className="p-3 rounded-2xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
                <ShoppingBag size={20} />
              </div>
            </div>
            <p className="text-3xl font-black text-white">{orders.length}</p>
            <p className="text-xs text-zinc-400 mt-2">Lifetime processed</p>
          </motion.div>

          {/* Pending Deliveries */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-zinc-900/70 border border-white/10 backdrop-blur-xl p-6 rounded-3xl relative overflow-hidden shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Pending Deliveries</span>
              <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Clock size={20} />
              </div>
            </div>
            <p className="text-3xl font-black text-amber-400">
              {orders.filter((o) => o.status !== 'Delivered').length}
            </p>
            <p className="text-xs text-zinc-400 mt-2">Requires fulfillment</p>
          </motion.div>

        </div>

        {/* Orders Table Section */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">All Customer Orders</h2>
          <span className="text-xs text-zinc-400">{orders.length} total entries</span>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
            <Loader2 size={32} className="animate-spin text-violet-500 mb-3" />
            <p className="text-sm">Fetching orders list...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center text-red-300 mb-8">
            {error}
          </div>
        )}

        {/* Orders Table Container */}
        {!loading && !error && (
          <div className="bg-zinc-900/70 border border-white/10 rounded-3xl backdrop-blur-xl shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    <th className="p-5">Order ID</th>
                    <th className="p-5">Customer</th>
                    <th className="p-5">Amount</th>
                    <th className="p-5">Status</th>
                    <th className="p-5">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-12 text-center text-zinc-500">
                        No customer orders recorded yet.
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order._id} className="hover:bg-white/[0.02] transition-colors">
                        
                        {/* Order ID */}
                        <td className="p-5 font-mono text-xs text-violet-400">
                          #{order._id.slice(-6)}
                        </td>

                        {/* Customer */}
                        <td className="p-5 font-medium text-white">
                          <div className="flex items-center gap-2">
                            <UserCheck size={16} className="text-zinc-400" />
                            {order.user?.name || 'Guest User'}
                          </div>
                        </td>

                        {/* Amount */}
                        <td className="p-5 font-bold text-white">
                          ${order.totalAmount?.toFixed(2)}
                        </td>

                        {/* Status Badge */}
                        <td className="p-5">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadgeClass(order.status)}`}>
                            {order.status || 'Pending'}
                          </span>
                        </td>

                        {/* Action Dropdown */}
                        <td className="p-5">
                          <select
                            value={order.status || 'Pending'}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            className="text-xs bg-zinc-800 border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-violet-500 transition cursor-pointer"
                          >
                            <option value="Pending" className="bg-zinc-900 text-white">Pending</option>
                            <option value="Processing" className="bg-zinc-900 text-white">Processing</option>
                            <option value="Shipped" className="bg-zinc-900 text-white">Shipped</option>
                            <option value="Delivered" className="bg-zinc-900 text-white">Delivered</option>
                          </select>
                        </td>

                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}