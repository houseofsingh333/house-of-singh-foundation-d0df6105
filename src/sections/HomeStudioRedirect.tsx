import { ArrowUpRight } from "lucide-react";

const HomeStudioRedirect = () => {
  return (
    <section className="px-8 md:px-16 py-20 md:py-28 border-t border-border">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h3 className="font-editorial text-xl md:text-2xl font-light text-foreground">
            Studios
          </h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-md">
            A design studio specializing in brand identities, graphic design, and creative direction for SMEs.
          </p>
        </div>
        <a
          href="https://studios.houseofsingh.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-foreground border border-foreground/20 px-8 py-4 hover:bg-foreground hover:text-background transition-all duration-500"
        >
          Visit Studios
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </section>
  );
};

export default HomeStudioRedirect;
