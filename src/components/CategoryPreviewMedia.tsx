import { useState, useEffect, useRef } from "react";

interface CategoryPreviewMediaProps {
  gifUrl?: string;
  images?: string[];
  title: string;
}

const CROSSFADE_INTERVAL = 5000; // match hero slider pace

const CategoryPreviewMedia = ({ gifUrl, images, title }: CategoryPreviewMediaProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (gifUrl || !images || images.length <= 1 || prefersReducedMotion.current) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, CROSSFADE_INTERVAL);
    return () => clearInterval(interval);
  }, [gifUrl, images]);

  if (gifUrl) {
    return (
      <div className="w-[75%] max-w-[240px] mx-auto mt-5 pointer-events-none">
        <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
          <img
            src={gifUrl}
            alt={`${title} preview`}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    );
  }

  if (images && images.length > 0) {
    return (
      <div className="w-[75%] max-w-[240px] mx-auto mt-5 pointer-events-none">
        <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${title} preview ${i + 1}`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[1.5s] ease-in-out"
              style={{ opacity: i === activeIndex ? 1 : 0 }}
            />
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default CategoryPreviewMedia;
