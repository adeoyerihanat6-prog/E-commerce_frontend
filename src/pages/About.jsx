// src/pages/About.jsx
import { Sparkles, ShieldCheck, Truck, Headphones } from "lucide-react";

export default function About() {
  const features = [
    { icon: <ShieldCheck className="text-violet-400" />, title: "Quality Guaranteed", desc: "Hand-picked luxury tech and curated lifestyle goods." },
    { icon: <Truck className="text-fuchsia-400" />, title: "Express Shipping", desc: "Fast global delivery with real-time order tracking." },
    { icon: <Headphones className="text-violet-400" />, title: "24/7 Support", desc: "Our concierges are always ready to assist you." },
  ];

  return (
    <div className="min-h-screen bg-[#09090B] text-white pt-32 pb-20 px-6 max-w-5xl mx-auto">
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs text-violet-300">
          <Sparkles size={14} /> The Velora Story
        </div>
        <h1 className="text-5xl font-black tracking-tight">Redefining Modern Luxury</h1>
        <p className="text-zinc-400 max-w-2xl mx-auto text-base leading-relaxed">
          VELORA was crafted with a vision to deliver premium, aesthetically modern products built for performance and everyday style.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f, idx) => (
          <div key={idx} className="rounded-3xl border border-white/10 bg-zinc-900/60 p-8 backdrop-blur-md">
            <div className="p-3 rounded-2xl bg-white/5 w-fit mb-4">{f.icon}</div>
            <h3 className="text-xl font-bold mb-2">{f.title}</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}