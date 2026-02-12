import { useState } from "react";
import { Link } from "react-router-dom";
import { heroSlides, siteSettings } from "@/lib/mock-data";

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const slides = heroSlides;
  const mode = siteSettings.homeHeroMode;

  // Static hero mode — just show first slide
  if (mode === "static") {
    const slide = slides[0];
    if (!slide) return null;
    return (
      <div className="relative w-full h-screen bg-muted flex items-center justify-center overflow-hidden">
        <img src={slide.image} alt={slide.caption || "Hero"} className="absolute inset-0 w-full h-full object-cover" />
        {slide.caption && (
          <div className="absolute bottom-8 left-8 z-10">
            <p className="text-sm tracking-wide text-foreground">{slide.caption}</p>
          </div>
        )}
      </div>
    );
  }

  const slide = slides[current];

  const content = (
    <div className="relative w-full h-screen bg-muted flex items-center justify-center overflow-hidden">
      <img src={slide.image} alt={slide.caption || "Hero slide"} className="absolute inset-0 w-full h-full object-cover" />

      {/* Bottom-left: dots + caption */}
      <div className="absolute bottom-8 left-8 z-10 flex items-center gap-4">
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrent(i); }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current ? "bg-foreground scale-125" : "bg-foreground/30"
              }`}
            />
          ))}
        </div>
        {slide.caption && (
          <p className="text-sm tracking-wide text-foreground">{slide.caption}</p>
        )}
      </div>
    </div>
  );

  if (slide.internalLink) return <Link to={slide.internalLink}>{content}</Link>;
  if (slide.externalLink) return <a href={slide.externalLink} target="_blank" rel="noopener noreferrer">{content}</a>;
  return content;
};

export default HeroSlider;
