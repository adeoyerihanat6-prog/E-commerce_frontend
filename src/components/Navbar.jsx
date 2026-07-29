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
  ChevronRight,
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
    setIsMobileMenuOpen(false);
    navigate("/login");
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Nav link style helper
  const navLinkStyle = ({ isActive }) =>
    `flex items-center justify-between py-2.5 px-3 rounded-xl transition-all duration-200 ${
      isActive
        ? "text-violet-400 font-semibold bg-violet-500/10"
        : "text-zinc-300 hover:text-white hover:bg-white/5"
    }`;

  return (
    <>
      <header className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 w-[92%] sm:w-[95%] max-w-7xl z-40">
        <nav className="bg-zinc-950/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl text-white">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg shadow-violet-500/30 group-hover:scale-105 transition duration-300">
                V
              </div>

              <div>
                <h1 className="text-white font-bold text-lg sm:text-xl tracking-wide leading-tight">
                  VELORA
                </h1>
                <p className="text-[10px] sm:text-xs text-zinc-400 -mt-0.5 sm:-mt-1">
                  Premium Store
                </p>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              <NavLink to="/" className={({ isActive }) => isActive ? "text-violet-400 font-semibold" : "text-zinc-300 hover:text-white transition"}>Home</NavLink>
              <NavLink to="/shop" className={({ isActive }) => isActive ? "text-violet-400 font-semibold" : "text-zinc-300 hover:text-white transition"}>Shop</NavLink>
              <NavLink to="/collections" className={({ isActive }) => isActive ? "text-violet-400 font-semibold" : "text-zinc-300 hover:text-white transition"}>Collections</NavLink>
              <NavLink to="/about" className={({ isActive }) => isActive ? "text-violet-400 font-semibold" : "text-zinc-300 hover:text-white transition"}>About</NavLink>
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center gap-2 sm:gap-3">

              {/* Cart Button */}
              <button
                onClick={onOpenCart}
                title="View Cart"
                className="relative p-2.5 sm:p-3 rounded-xl bg-white/5 hover:bg-violet-600 transition-all duration-300 group"
              >
                <ShoppingBag size={18} className="text-zinc-200 group-hover:text-white sm:w-5 sm:h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-[10px] sm:text-xs flex items-center justify-center font-bold text-white animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Desktop User Controls */}
              {token ? (
                <div className="hidden lg:flex items-center gap-3">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition text-sm text-zinc-200"
                  >
                    <User size={18} className="text-violet-400" />
                    <span>{user?.name || "Profile"}</span>
                  </Link>

                  {isAdmin && (
                    <>
                      <Link
                        to="/admin/dashboard"
                        className="flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition"
                      >
                        <LayoutDashboard size={18} />
                        Dashboard
                      </Link>

                      <Link
                        to="/admin/add-product"
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:scale-105 transition shadow-md shadow-violet-500/20"
                      >
                        <Plus size={18} />
                        Product
                      </Link>
                    </>
                  )}

                  <button
                    onClick={handleLogout}
                    title="Logout"
                    className="p-3 rounded-xl bg-white/5 hover:bg-red-500/20 transition group"
                  >
                    <LogOut className="text-red-400 group-hover:text-red-300" size={20} />
                  </button>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-3">
                  <Link
                    to="/login"
                    className="text-sm text-zinc-300 hover:text-white transition"
                  >
                    Sign In
                  </Link>

                  <Link
                    to="/register"
                    className="px-4 py-2 text-sm rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:scale-105 transition text-white font-medium shadow-md shadow-violet-500/20"
                  >
                    Get Started
                  </Link>
                </div>
              )}

              {/* Mobile Menu Hamburger Toggle Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300"
                aria-label="Open Side Menu"
              >
                <Menu size={20} />
              </button>

            </div>
          </div>
        </nav>
      </header>

      {/* ========================================== */}
      {/* MOBILE SIDE NAVBAR DRAWER                  */}
      {/* ========================================== */}

      {/* Darkened Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMobileMenu}
      />

      {/* Slide-in Drawer Container */}
      <aside
        className={`fixed top-0 right-0 h-full w-4/5 max-w-xs bg-zinc-950 border-l border-white/10 z-50 shadow-2xl flex flex-col justify-between p-6 transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          {/* Side Drawer Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center text-white font-bold text-sm">
                V
              </div>
              <span className="font-bold text-white tracking-wide">VELORA</span>
            </div>

            <button
              onClick={closeMobileMenu}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* User Status / Mobile Welcome Header */}
          {token && user && (
            <div className="mt-6 p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center font-bold">
                <User size={18} />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs text-zinc-400">Signed in as</p>
                <p className="text-sm text-white font-medium truncate">{user.name}</p>
              </div>
            </div>
          )}

          {/* Navigation Items */}
          <nav className="mt-6 flex flex-col gap-1.5 text-sm">
            <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider px-3 mb-1">
              Menu
            </p>
            <NavLink to="/" onClick={closeMobileMenu} className={navLinkStyle}>
              <span>Home</span>
              <ChevronRight size={16} className="text-zinc-500" />
            </NavLink>
            <NavLink to="/shop" onClick={closeMobileMenu} className={navLinkStyle}>
              <span>Shop</span>
              <ChevronRight size={16} className="text-zinc-500" />
            </NavLink>
            <NavLink to="/collections" onClick={closeMobileMenu} className={navLinkStyle}>
              <span>Collections</span>
              <ChevronRight size={16} className="text-zinc-500" />
            </NavLink>
            <NavLink to="/about" onClick={closeMobileMenu} className={navLinkStyle}>
              <span>About</span>
              <ChevronRight size={16} className="text-zinc-500" />
            </NavLink>

            {token && (
              <NavLink to="/profile" onClick={closeMobileMenu} className={navLinkStyle}>
                <span>My Profile</span>
                <ChevronRight size={16} className="text-zinc-500" />
              </NavLink>
            )}

            {/* Admin Specific Links on Mobile */}
            {token && isAdmin && (
              <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-2">
                <p className="text-[11px] font-semibold text-violet-400 uppercase tracking-wider px-3">
                  Admin Panel
                </p>
                <NavLink
                  to="/admin/dashboard"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-2.5 py-2.5 px-3 rounded-xl text-zinc-300 hover:bg-white/5 transition"
                >
                  <LayoutDashboard size={18} className="text-violet-400" />
                  Dashboard
                </NavLink>

                <NavLink
                  to="/admin/add-product"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-medium bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-md shadow-violet-500/20"
                >
                  <Plus size={18} />
                  Add Product
                </NavLink>
              </div>
            )}
          </nav>
        </div>

        {/* Footer Actions / Sign In / Logout */}
        <div className="pt-6 border-t border-white/10">
          {token ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 font-medium text-sm transition"
            >
              <LogOut size={18} />
              Logout Account
            </button>
          ) : (
            <div className="flex flex-col gap-2.5">
              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="w-full py-2.5 text-center text-sm font-medium text-zinc-300 bg-white/5 rounded-xl hover:bg-white/10 transition"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={closeMobileMenu}
                className="w-full py-2.5 text-center text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-xl transition shadow-md shadow-violet-500/20"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}