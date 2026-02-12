import { useState } from "react";
import { Link } from "react-router-dom";
import { projects, projectCategories } from "@/lib/mock-data";

const Projects = () => {
  const [categorySlug, setCategorySlug] = useState<string>("all");
  const [view, setView] = useState<"grid" | "list">("grid");

  const sorted = [...projectCategories].sort((a, b) => a.order - b.order);
  const filtered = categorySlug === "all" ? projects : projects.filter((p) => p.category.slug === categorySlug);

  return (
    <div className="px-6 py-16 max-w-5xl mx-auto">
      <h1 className="text-3xl font-light tracking-wide text-foreground mb-8">Projects</h1>

      {/* Category filter — driven by projectCategory documents */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setCategorySlug("all")}
          className={`px-4 py-2 text-sm border transition-colors ${
            categorySlug === "all" ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
          }`}
        >
          All
        </button>
        {sorted.map((cat) => (
          <button
            key={cat._id}
            onClick={() => setCategorySlug(cat.slug)}
            className={`px-4 py-2 text-sm border transition-colors ${
              categorySlug === cat.slug ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* View toggle */}
      <div className="flex gap-2 mb-8">
        <button onClick={() => setView("grid")} className={`text-sm px-3 py-1 ${view === "grid" ? "text-foreground underline" : "text-muted-foreground"}`}>Grid</button>
        <button onClick={() => setView("list")} className={`text-sm px-3 py-1 ${view === "list" ? "text-foreground underline" : "text-muted-foreground"}`}>List</button>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <Link key={p._id} to={`/projects/${p.slug}`} className="group block border border-border p-4 hover:bg-muted/50 transition-colors">
              <img src={p.gallery[0]?.src} alt={p.title} className="w-full h-48 object-cover bg-muted mb-3" />
              <h3 className="text-foreground font-medium">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.category.title} · {p.year}</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((p) => (
            <Link key={p._id} to={`/projects/${p.slug}`} className="flex items-center gap-4 border-b border-border pb-4 hover:bg-muted/30 transition-colors px-2">
              <img src={p.gallery[0]?.src} alt={p.title} className="w-20 h-20 object-cover bg-muted flex-shrink-0" />
              <div>
                <h3 className="text-foreground font-medium">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.category.title} · {p.year}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
