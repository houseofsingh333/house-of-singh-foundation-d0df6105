import { useState } from "react";
import { Link } from "react-router-dom";
import { projectCategories } from "../lib/mock-data";

const categoryPreviews: Record<string, string> = {
  photography: "/placeholder.svg",
  design: "/placeholder.svg",
  collaborations: "/placeholder.svg",
};

const HomeProjects = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const hoveredCat = projectCategories.find((c) => c._id === hoveredId);

  return (
    <section className="px-8 md:px-16 py-24 md:py-36">
      {/* Section header */}
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="font-editorial text-2xl md:text-3xl font-light text-foreground">
          Projects
        </h2>
        <Link
          to="/projects"
          className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 border-b border-foreground/30 pb-0.5"
        >
          See all
        </Link>
      </div>
      <div className="w-full h-px bg-border mb-14" />

      {/* Marquee strip */}
      <div className="relative overflow-hidden">
        {/* Scrolling marquee */}
        <div
          className="flex whitespace-nowrap"
          style={{
            animationPlayState: hoveredId ? "paused" : "running",
          }}
        >
          {/* Double the items for seamless loop */}
          {[...Array(2)].map((_, loopIdx) => (
            <div
              key={loopIdx}
              className="flex shrink-0 animate-[marquee_20s_linear_infinite]"
              style={{
                animationPlayState: hoveredId ? "paused" : "running",
              }}
            >
              {projectCategories.map((cat) => {
                const isHovered = hoveredId === cat._id;
                const hasHover = hoveredId !== null;

                return (
                  <Link
                    key={`${loopIdx}-${cat._id}`}
                    to={`/projects?filter=${cat.slug}`}
                    className="inline-flex items-baseline gap-3 md:gap-4 px-6 md:px-10 group cursor-pointer"
                    onMouseEnter={() => setHoveredId(cat._id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <span
                      className="text-[10px] tracking-widest text-muted-foreground/40 transition-colors duration-300"
                      style={{ color: isHovered ? "hsl(var(--foreground))" : undefined }}
                    >
                      {String(cat.order).padStart(2, "0")}
                    </span>
                    <span
                      className="font-editorial text-4xl md:text-6xl lg:text-7xl font-light transition-all duration-500"
                      style={{
                        color: hasHover && !isHovered
                          ? "hsl(var(--muted-foreground) / 0.2)"
                          : "hsl(var(--foreground))",
                        letterSpacing: isHovered ? "0.05em" : "0",
                      }}
                    >
                      {cat.title}
                    </span>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Reveal image strip below */}
      <div
        className="relative overflow-hidden transition-all duration-700 ease-out mt-8"
        style={{ maxHeight: hoveredId ? "280px" : "0", opacity: hoveredId ? 1 : 0 }}
      >
        <div className="w-full h-[280px] bg-secondary overflow-hidden">
          {hoveredCat && (
            <img
              src={categoryPreviews[hoveredCat.slug] || "/placeholder.svg"}
              alt={hoveredCat.title}
              className="w-full h-full object-cover transition-transform duration-1000 scale-105 hover:scale-100"
            />
          )}
          {hoveredCat && (
            <div className="absolute bottom-6 left-8 md:left-10">
              <p className="text-xs tracking-widest uppercase text-foreground/70">
                {hoveredCat.title}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs tracking-widest uppercase text-muted-foreground">
                  View
                </span>
                <span className="text-muted-foreground text-xs">→</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeProjects;
