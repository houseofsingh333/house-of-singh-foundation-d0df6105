import { ArrowUpRight } from "lucide-react";

const HomeStudioRedirect = () => {
  return (
    <section className="bg-foreground text-background px-8 md:px-16 py-24 md:py-36">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-8">
        <p className="text-[10px] tracking-[0.3em] uppercase text-background/40">
          A different practice
        </p>

        <h3 className="font-editorial text-3xl md:text-5xl lg:text-6xl font-light leading-[1.1]">
          Studios
        </h3>

        <p className="text-sm md:text-[15px] text-background/60 leading-[1.8] max-w-md">
          A design studio specializing in brand identities, graphic design, and
          creative direction for SMEs.
        </p>

        <a
          href="https://studios.houseofsingh.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs tracking-widest uppercase border border-background/20 px-8 py-4 hover:bg-background hover:text-foreground transition-all duration-500 mt-4"
        >
          Visit Studios
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </section>
  );
};

export default HomeStudioRedirect;
