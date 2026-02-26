import { useState, useEffect, useRef } from "react";
import { Instagram } from "lucide-react";

// Placeholder images — swap with real Instagram URLs later
const FEED_IMAGES = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80",
];

const CROSSFADE_MS = 6000;

const InstagramFeed = () => {
  const [active, setActive] = useState(0);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  useEffect(() => {
    if (reducedMotion.current) return;
    const interval = setInterval(() => {
      setActive((p) => (p + 1) % FEED_IMAGES.length);
    }, CROSSFADE_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full min-h-[420px] md:min-h-0">
      {/* Images */}
      {FEED_IMAGES.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[2.5s] ease-in-out"
          style={{
            opacity: i === active ? 1 : 0,
            filter: "saturate(0.85) contrast(0.95)",
          }}
        />
      ))}

      {/* Subtle grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Instagram credit */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 opacity-[0.25]">
        <Instagram className="w-4 h-4 text-white" />
      </div>
    </div>
  );
};

export default InstagramFeed;
