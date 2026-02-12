import { useState } from "react";
import { Link } from "react-router-dom";
import { projectCategories } from "../lib/mock-data";

// Map category slugs to preview GIFs/images — replace these with actual GIFs
const categoryPreviews: Record<string, string> = {
  photography: "/placeholder.svg",
  design: "/placeholder.svg",
  collaborations: "/placeholder.svg",
};

const HomeProjects = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="px-8 md:px-16 py-20 md:py-28">
      <div className="flex items-baseline justify-between mb-14">
        <h2 className="text-xs tracking-widest uppercase text-muted-foreground">
          Projects
        </h2>
        <Link
          to="/projects"
          className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
        >
          See all
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
        {projectCategories.map((cat) => (
          <Link
            key={cat._id}
            to={`/projects?filter=${cat.slug}`}
            className="group relative bg-background p-8 md:p-12 flex flex-col justify-between min-h-[260px] overflow-hidden hover:bg-secondary transition-colors duration-500"
            onMouseEnter={() => setHoveredId(cat._id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Hover GIF/image preview */}
            <div
              className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
                hoveredId === cat._id ? "opacity-20" : "opacity-0"
              }`}
            >
              <img
                src={categoryPreviews[cat.slug] || "/placeholder.svg"}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <span className="relative z-10 text-xs tracking-widest uppercase text-muted-foreground group-hover:text-foreground transition-colors duration-500">
              {String(cat.order).padStart(2, "0")}
            </span>
            <div className="relative z-10">
              <h3 className="font-editorial text-xl md:text-2xl font-light text-foreground mt-8">
                {cat.title}
              </h3>
              <div className="mt-4 w-6 h-px bg-foreground/20 group-hover:w-12 transition-all duration-500" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HomeProjects;
