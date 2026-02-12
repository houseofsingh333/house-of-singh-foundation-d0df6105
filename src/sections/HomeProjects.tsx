const featuredProjects = [
  { id: "p1", title: "Project Alpha", slug: "project-alpha", category: "Design", year: 2024, image: "/placeholder.svg" },
  { id: "p2", title: "Project Beta", slug: "project-beta", category: "Architecture", year: 2024, image: "/placeholder.svg" },
  { id: "p3", title: "Project Gamma", slug: "project-gamma", category: "Collaborations", year: 2023, image: "/placeholder.svg" },
  { id: "p4", title: "Project Delta", slug: "project-delta", category: "Photography", year: 2023, image: "/placeholder.svg" },
];

const HomeProjects = () => {
  return (
    <section className="px-6 py-20 max-w-5xl mx-auto">
      <h2 className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-12 text-center">
        Selected Projects
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
        {featuredProjects.map((project) => (
          <a
            key={project.id}
            href={`/projects/${project.slug}`}
            className="group relative block aspect-[4/3] overflow-hidden bg-muted"
          >
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/60 transition-colors duration-500 flex items-center justify-center">
              <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
                <h3 className="text-primary-foreground text-lg tracking-wide font-light">
                  {project.title}
                </h3>
                <p className="text-primary-foreground/70 text-xs tracking-[0.2em] uppercase mt-2">
                  {project.category} · {project.year}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default HomeProjects;
