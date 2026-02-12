import { Link } from "react-router-dom";
import portraitImage from "@/assets/maninder-portrait.jpg";

const HomeIntro = () => {
  return (
    <section className="px-8 md:px-16 py-24 md:py-32">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        {/* Portrait */}
        <div className="aspect-square overflow-hidden bg-secondary">
          <img
            src={portraitImage}
            alt="Maninder Singh — Creative Director, Designer & Photographer"
            className="w-full h-full object-cover object-top grayscale"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-6">
          <p className="text-muted-foreground text-xs tracking-widest uppercase">
            Creative Director · Designer · Photographer
          </p>
          <h2 className="font-editorial text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-foreground">
            Maninder Singh
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-md">
            Guided by a deep curiosity for life's quiet wonders, he creates work that reflects the rhythm of nature and human connection. Based in Toronto, he blends design and photography to craft stories that feel both visually refined and emotionally resonant.
          </p>
          <div className="mt-4">
            <Link
              to="/about"
              className="inline-block border border-foreground/30 px-6 py-2.5 text-xs tracking-widest uppercase text-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
            >
              About Maninder
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeIntro;
