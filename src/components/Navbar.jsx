import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  User,
  LogOut,
  LayoutDashboard,
  Plus,
  Menu,
  X,
} from "lucide-react";

export default function Navbar({ cartCount = 0, onOpenCart }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const isAdmin = user?.role === "Admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Active link helper function
  const navLinkStyle = ({ isActive }) =>
    `transition-colors duration-200 ${
      isActive
        ? "text-violet-400 font-semibold"
        : "text-zinc-300 hover:text-white"
    }`;

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50">
      <nav className="bg-zinc-950/70 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl text-white">
        <div className="flex items-center justify-between px-6 py-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-violet-500/30 group-hover:scale-105 transition duration-300">
              V
            </div>

            <div>
              <h1 className="text-white font-bold text-xl tracking-wide">
                VELORA
              </h1>
              <p className="text-xs text-zinc-400 -mt-1">
                Premium Store
              </p>
            </div>
          </Link>

          {/* Center Links (Desktop) */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <NavLink to="/" className={navLinkStyle}>
              Home
            </NavLink>

            <NavLink to="/shop" className={navLinkStyle}>
              Shop
            </NavLink>

            <NavLink to="/collections" className={navLinkStyle}>
              Collections
            </NavLink>

            <NavLink to="/about" className={navLinkStyle}>
              About
            </NavLink>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-3">

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              title="View Cart"
              className="relative p-3 rounded-xl bg-white/5 hover:bg-violet-600 transition-all duration-300 group"
            >
              <ShoppingBag size={20} className="text-zinc-200 group-hover:text-white" />

              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-xs flex items-center justify-center font-bold text-white animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {token ? (
              <>
                {/* Profile Link */}
                <Link
                  to="/profile"
                  className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition text-sm text-zinc-200"
                >
                  <User size={18} className="text-violet-400" />
                  <span>{user?.name || "Profile"}</span>
                </Link>

                {/* Admin Controls */}
                {isAdmin && (
                  <>
                    <Link
                      to="/admin/dashboard"
                      className="hidden lg:flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition"
                    >
                      <LayoutDashboard size={18} />
                      Dashboard
                    </Link>

                    <Link
                      to="/admin/add-product"
                      className="hidden lg:flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:scale-105 transition shadow-md shadow-violet-500/20"
                    >
                      <Plus size={18} />
                      Product
                    </Link>
                  </>
                )}

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-3 rounded-xl bg-white/5 hover:bg-red-500/20 transition group"
                >
                  <LogOut className="text-red-400 group-hover:text-red-300" size={20} />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden sm:inline-block text-sm text-zinc-300 hover:text-white transition"
                >
                  Sign In
                </Link>

                <Link
                  to="/register"
                  className="px-5 py-2.5 text-sm rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:scale-105 transition text-white font-medium shadow-md shadow-violet-500/20"
                >
                  Get Started
                </Link>
              </>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden px-6 pb-6 pt-2 border-t border-white/10 flex flex-col gap-4 text-sm font-medium">
            <NavLink
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={navLinkStyle}
            >
              Home
            </NavLink>
            <NavLink
              to="/shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className={navLinkStyle}
            >
              Shop
            </NavLink>
            <NavLink
              to="/collections"
              onClick={() => setIsMobileMenuOpen(false)}
              className={navLinkStyle}
            >
              Collections
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className={navLinkStyle}
            >
              About
            </NavLink>

            {token && (
              <NavLink
                to="/profile"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-zinc-300 hover:text-white"
              >
                My Profile ({user?.name})
              </NavLink>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}