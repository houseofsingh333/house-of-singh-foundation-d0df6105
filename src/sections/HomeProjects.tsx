const featuredProjects = [
  { id: "p1", title: "Project Alpha", slug: "project-alpha", category: "Design", year: 2024, image: "/placeholder.svg" },
  { id: "p3", title: "Project Gamma", slug: "project-gamma", category: "Collaborations", year: 2024, image: "/placeholder.svg" },
];

const HomeProjects = () => {
  return (
    <section className="px-6 py-16">
      <h2 className="text-2xl font-light tracking-wide text-black mb-8 text-center">Selected Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {featuredProjects.map((project) => (
          <a
            key={project.id}
            href={`/projects/${project.slug}`}
            className="group block border border-neutral-200 p-4 hover:bg-neutral-50 transition-colors"
          >
            <img src={project.image} alt={project.title} className="w-full h-48 object-cover bg-neutral-100 mb-3" />
            <h3 className="text-black font-medium">{project.title}</h3>
            <p className="text-sm text-neutral-500">{project.category} · {project.year}</p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default HomeProjects;
