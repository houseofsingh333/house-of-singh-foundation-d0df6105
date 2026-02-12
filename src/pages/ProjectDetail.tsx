import { useParams, Link } from "react-router-dom";
import { projects } from "@/lib/mock-data";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="px-6 py-16 text-center">
        <h1 className="text-2xl text-foreground mb-4">Project not found</h1>
        <Link to="/projects" className="text-muted-foreground underline">Back to projects</Link>
      </div>
    );
  }

  return (
    <div className="px-6 py-16 max-w-4xl mx-auto">
      {project.featured && (
        <span className="inline-block text-xs uppercase tracking-widest border border-foreground px-2 py-1 text-foreground mb-4">Featured</span>
      )}
      <h1 className="text-3xl font-light tracking-wide text-foreground mb-2">{project.title}</h1>
      <p className="text-sm text-muted-foreground mb-8">
        {project.category.title} · {project.year}
        {project.collaborators && ` · ${project.collaborators}`}
      </p>
      <div className="mb-12">
        <p className="text-muted-foreground leading-relaxed">{project.description}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {project.gallery.map((img, i) => (
          <img key={i} src={img.src} alt={img.alt} className="w-full h-64 object-cover bg-muted" />
        ))}
      </div>
      <div className="mt-12">
        <Link to="/projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">← Back to projects</Link>
      </div>
    </div>
  );
};

export default ProjectDetail;
