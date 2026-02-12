import { useState } from "react";

const slides = [
  { id: "1", image: "/placeholder.svg", caption: "Slide One", internalLink: "/projects" },
  { id: "2", image: "/placeholder.svg", caption: "Slide Two", externalLink: "https://studios.houseofsingh.com" },
  { id: "3", image: "/placeholder.svg", caption: "Slide Three" },
];

const HomeHero = () => {
  const [current, setCurrent] = useState(0);
  const slide = slides[current];

  const content = (
    <div className="relative w-full h-screen bg-neutral-100 flex items-center justify-center overflow-hidden">
      <img
        src={slide.image}
        alt={slide.caption || "Hero slide"}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute bottom-8 left-8 z-10 flex items-center gap-4">
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCurrent(i);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current ? "bg-black scale-125" : "bg-black/30"
              }`}
            />
          ))}
        </div>
        {slide.caption && (
          <p className="text-sm tracking-wide text-black">{slide.caption}</p>
        )}
      </div>
    </div>
  );

  if (slide.internalLink) return <a href={slide.internalLink}>{content}</a>;
  if (slide.externalLink) return <a href={slide.externalLink} target="_blank" rel="noopener noreferrer">{content}</a>;
  return content;
};

export default HomeHero;
