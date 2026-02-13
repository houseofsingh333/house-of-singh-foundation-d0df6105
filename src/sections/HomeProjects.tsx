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

  return (
    <section className="px-8 md:px-16 py-24 md:py-36">
      {/* Section header with rule */}
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

      {/* Category cards — inspired by reference grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {projectCategories.map((cat) => (
          <Link
            key={cat._id}
            to={`/projects?filter=${cat.slug}`}
            className="group relative bg-secondary/40 overflow-hidden hover:bg-secondary transition-colors duration-500"
            onMouseEnter={() => setHoveredId(cat._id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Hover GIF/image preview */}
            <div
              className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
                hoveredId === cat._id ? "opacity-25" : "opacity-0"
              }`}
            >
              <img
                src={categoryPreviews[cat.slug] || "/placeholder.svg"}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 md:p-10 min-h-[220px] flex flex-col justify-end">
              <p className="text-[11px] tracking-widest uppercase text-muted-foreground mb-3 transition-colors duration-300 group-hover:text-foreground">
                {String(cat.order).padStart(2, "0")}
              </p>
              <h3 className="font-editorial text-lg md:text-xl font-light text-foreground">
                {cat.title}
              </h3>
              <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                <span className="text-xs tracking-widest uppercase text-muted-foreground">
                  View
                </span>
                <span className="text-muted-foreground text-xs">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HomeProjects;
