import { Link } from "react-router-dom";
import { spotlightProject } from "../lib/mock-data";

const HomeSpotlight = () => {
  const project = spotlightProject;

  return (
    <section className="px-8 md:px-16 py-20 md:py-28">
      <p className="text-xs tracking-widest uppercase text-muted-foreground mb-14">
        Spotlight
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
        {/* Image */}
        <Link
          to={`/projects/${project.slug}`}
          className="group block aspect-[4/3] overflow-hidden bg-secondary"
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
        </Link>

        {/* Text */}
        <div className="max-w-md">
          <h3 className="font-editorial text-2xl md:text-3xl font-light text-foreground leading-snug">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mt-5">
            {project.description}
          </p>
          <Link
            to={`/projects/${project.slug}`}
            className="inline-block mt-8 text-xs tracking-widest uppercase text-foreground border-b border-foreground/30 pb-1 hover:border-foreground transition-colors duration-300"
          >
            See project
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeSpotlight;
