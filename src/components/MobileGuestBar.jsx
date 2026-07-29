import { Link } from "react-router-dom";
import { UserPlus, Sparkles } from "lucide-react";

export function MobileGuestBar() {
  const token = localStorage.getItem("token");

  // Don't render if the user is already logged in
  if (token) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-md z-40 md:hidden">
      <div className="bg-zinc-950/90 backdrop-blur-xl border border-violet-500/30 rounded-2xl p-3 shadow-2xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center shrink-0">
            <Sparkles size={16} />
          </div>
          <div className="truncate">
            <p className="text-xs font-semibold text-white truncate">New to VELORA?</p>
            <p className="text-[10px] text-zinc-400 truncate">Sign up to unlock full checkout</p>
          </div>
        </div>

        <Link
          to="/register"
          className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-xs font-semibold shadow-md shadow-violet-500/20"
        >
          <UserPlus size={14} />
          <span>Sign Up</span>
        </Link>
      </div>
    </div>
  );
}