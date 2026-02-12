import { Link } from "react-router-dom";
import { projectCategories } from "../lib/mock-data";

const HomeProjects = () => {
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
            className="group bg-background p-8 md:p-12 flex flex-col justify-between min-h-[200px] hover:bg-secondary transition-colors duration-500"
          >
            <span className="text-xs tracking-widest uppercase text-muted-foreground group-hover:text-foreground transition-colors duration-500">
              {String(cat.order).padStart(2, "0")}
            </span>
            <div>
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
