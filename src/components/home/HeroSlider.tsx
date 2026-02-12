import { useState } from "react";
import { Link } from "react-router-dom";
import { heroSlides, siteSettings } from "@/lib/mock-data";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const slides = heroSlides;
  const mode = siteSettings.homeHeroMode;

  // Static hero mode — just show first slide with no controls
  if (mode === "static") {
    const slide = slides[0];
    if (!slide) return null;
    return (
      <div className="relative w-full h-[70vh] bg-muted flex items-center justify-center overflow-hidden">
        <img src={slide.image} alt={slide.caption || "Hero"} className="absolute inset-0 w-full h-full object-cover" />
        {slide.caption && (
          <div className="relative z-10 text-center">
            <p className="text-lg text-foreground bg-background/60 px-4 py-2 inline-block">{slide.caption}</p>
          </div>
        )}
      </div>
    );
  }

  const prev = () => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));
  const slide = slides[current];

  const content = (
    <div className="relative w-full h-[70vh] bg-muted flex items-center justify-center overflow-hidden">
      <img src={slide.image} alt={slide.caption || "Hero slide"} className="absolute inset-0 w-full h-full object-cover" />
      <div className="relative z-10 text-center">
        {slide.caption && <p className="text-lg text-foreground bg-background/60 px-4 py-2 inline-block">{slide.caption}</p>}
      </div>
      <button onClick={prev} className="absolute left-4 z-10 p-2 bg-background/60 rounded-full hover:bg-background/80 transition">
        <ChevronLeft className="h-5 w-5 text-foreground" />
      </button>
      <button onClick={next} className="absolute right-4 z-10 p-2 bg-background/60 rounded-full hover:bg-background/80 transition">
        <ChevronRight className="h-5 w-5 text-foreground" />
      </button>
      <div className="absolute bottom-4 z-10 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition ${i === current ? "bg-foreground" : "bg-foreground/30"}`} />
        ))}
      </div>
    </div>
  );

  if (slide.internalLink) return <Link to={slide.internalLink}>{content}</Link>;
  if (slide.externalLink) return <a href={slide.externalLink} target="_blank" rel="noopener noreferrer">{content}</a>;
  return content;
};

export default HeroSlider;
