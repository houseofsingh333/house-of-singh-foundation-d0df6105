import { Link } from "react-router-dom";
import { projects } from "@/lib/mock-data";

const ProjectsPreview = () => {
  const featured = projects.filter((p) => p.featured);

  return (
    <section className="px-6 py-16">
      <h2 className="text-2xl font-light tracking-wide text-foreground mb-8 text-center">Selected Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {featured.map((project) => (
          <Link
            key={project._id}
            to={`/projects/${project.slug}`}
            className="group block border border-border p-4 hover:bg-muted/50 transition-colors"
          >
            <img src={project.gallery[0]?.src} alt={project.title} className="w-full h-48 object-cover bg-muted mb-3" />
            <h3 className="text-foreground font-medium">{project.title}</h3>
            <p className="text-sm text-muted-foreground">{project.category.title} · {project.year}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProjectsPreview;
