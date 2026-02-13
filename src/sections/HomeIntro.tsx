import { Link } from "react-router-dom";
import portraitImage from "@/assets/maninder-portrait.jpg";

const HomeIntro = () => {
  return (
    <section className="px-8 md:px-16 py-24 md:py-36">
      {/* Section label */}
      <div className="mb-16">
        <p className="text-xs tracking-widest uppercase text-muted-foreground">
          About
        </p>
        <div className="w-full h-px bg-border mt-4" />
      </div>

      {/* Two-column editorial layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
        {/* Left column — bold statement */}
        <div className="md:col-span-5">
          <h2 className="font-editorial text-2xl md:text-3xl lg:text-[2.5rem] font-light leading-[1.3] text-foreground">
            Guided by a deep curiosity for life's quiet wonders, creating work
            that reflects the rhythm of nature and human connection.
          </h2>
        </div>

        {/* Right column — body text + portrait */}
        <div className="md:col-span-6 md:col-start-7 flex flex-col gap-10">
          <p className="text-sm md:text-[15px] text-muted-foreground leading-[1.8] max-w-md">
            Based in Toronto, Maninder Singh blends design and photography to
            craft stories that feel both visually refined and emotionally
            resonant. As a creative director, multidisciplinary designer, and
            photographer, his practice spans brand identities, editorial work,
            and fine art — always grounded in intention and detail.
          </p>

          {/* Portrait */}
          <div className="w-full max-w-sm aspect-[3/4] overflow-hidden bg-secondary">
            <img
              src={portraitImage}
              alt="Maninder Singh — Creative Director, Designer & Photographer"
              className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>

          <Link
            to="/about"
            className="inline-flex items-center gap-3 text-xs tracking-widest uppercase text-foreground group w-fit"
          >
            <span className="border-b border-foreground/30 pb-1 group-hover:border-foreground transition-colors duration-300">
              Discover
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeIntro;
