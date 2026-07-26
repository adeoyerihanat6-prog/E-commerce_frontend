import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Sparkles, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await API.post('/users/login', formData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-white flex items-center justify-center px-6 py-28 relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute w-96 h-96 bg-violet-700/20 blur-[150px] rounded-full top-20 left-10 pointer-events-none" />
      <div className="absolute w-96 h-96 bg-fuchsia-600/20 blur-[150px] rounded-full bottom-20 right-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-zinc-900/70 backdrop-blur-xl p-8 md:p-10 shadow-2xl"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3.5 py-1.5 text-xs text-violet-300 mb-4 backdrop-blur-md">
              <Sparkles size={14} /> Account Access
            </div>
            <h2 className="text-3xl font-black tracking-tight">Welcome Back</h2>
            <p className="text-zinc-400 text-sm mt-2">
              Sign in to manage your orders and account settings.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-xs text-red-300 text-center"
            >
              {error}
            </motion.div>
          )}

          <div className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl bg-zinc-800/80 border border-white/10 pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-violet-500 transition"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl bg-zinc-800/80 border border-white/10 pl-11 pr-11 py-3.5 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-violet-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-4 font-semibold text-white shadow-lg shadow-violet-500/20 hover:scale-[1.01] active:scale-95 transition flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <span>Log In</span>
                  <LogIn size={18} />
                </>
              )}
            </button>
          </div>

          {/* Footer Link */}
          <p className="text-sm text-center mt-8 text-zinc-400">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-medium text-violet-400 hover:text-fuchsia-400 transition underline underline-offset-4"
            >
              Register here
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}