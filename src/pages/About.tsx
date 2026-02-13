import { useState } from "react";
import portraitImage from "@/assets/maninder-portrait.jpg";

const About = () => {
  const [imageRevealed, setImageRevealed] = useState(false);

  return (
    <div className="overflow-hidden">
      {/* 1 — Oversized name as texture */}
      <section className="relative px-8 md:px-16 pt-32 pb-0">
        <p className="text-xs tracking-widest uppercase text-muted-foreground mb-6">
          About
        </p>
        <div className="w-full h-px bg-border mb-16" />

        {/* Giant display name — acts as visual texture */}
        <h1 className="font-editorial text-[clamp(3rem,12vw,10rem)] font-light leading-[0.9] text-foreground/[0.07] select-none pointer-events-none whitespace-nowrap -ml-2">
          Maninder
          <br />
          Singh
        </h1>
      </section>

      {/* 2 — Overlapping image + text block */}
      <section className="relative px-8 md:px-16 -mt-24 md:-mt-40 pb-24 md:pb-36">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-8 items-start">
          {/* Portrait — overlaps the giant text */}
          <div
            className="md:col-span-4 md:col-start-2 relative z-10"
            onMouseEnter={() => setImageRevealed(true)}
          >
            <div className="w-full aspect-[3/4] overflow-hidden bg-secondary">
              <img
                src={portraitImage}
                alt="Maninder Singh — Creative Director, Designer & Photographer"
                className={`w-full h-full object-cover object-top transition-all duration-1000 ${
                  imageRevealed ? "grayscale-0 scale-100" : "grayscale scale-[1.05]"
                }`}
              />
            </div>
            <p className="text-[10px] tracking-widest uppercase text-muted-foreground mt-4">
              Toronto, Canada
            </p>
          </div>

          {/* Right — roles stacked vertically + intro */}
          <div className="md:col-span-5 md:col-start-7 flex flex-col gap-12 pt-12 md:pt-24">
            {/* Roles as a vertical list */}
            <div className="space-y-1">
              {["Creative Director", "Multidisciplinary Designer", "Photographer"].map(
                (role, i) => (
                  <p
                    key={role}
                    className="font-editorial text-xl md:text-2xl lg:text-3xl font-light text-foreground leading-[1.4]"
                    style={{ opacity: 1 - i * 0.15 }}
                  >
                    {role}
                  </p>
                )
              )}
            </div>

            <p className="text-sm md:text-[15px] text-muted-foreground leading-[1.8] max-w-sm">
              Guided by a deep curiosity for life's quiet wonders, creating work
              that reflects the rhythm of nature and human connection.
            </p>
          </div>
        </div>
      </section>

      {/* 3 — Bio as a single centered column with large pull-quote */}
      <section className="px-8 md:px-16 pb-24 md:pb-36">
        <div className="max-w-2xl mx-auto md:ml-[16.666%]">
          {/* Pull quote */}
          <blockquote className="font-editorial text-2xl md:text-[2rem] font-light leading-[1.4] text-foreground mb-12 relative">
            <span className="absolute -left-6 md:-left-10 top-0 text-4xl md:text-5xl text-foreground/10 font-editorial leading-none">
              "
            </span>
            Design is not decoration — it's a way of seeing the world and
            giving meaning to what we often overlook.
          </blockquote>

          <div className="space-y-6">
            <p className="text-sm md:text-[15px] text-muted-foreground leading-[1.8]">
              Based in Toronto, Maninder Singh blends design and photography to
              craft stories that feel both visually refined and emotionally
              resonant. His practice spans brand identities, editorial work,
              and fine art — always grounded in intention and detail.
            </p>
            <p className="text-sm md:text-[15px] text-muted-foreground leading-[1.8]">
              Every project begins with observation — noticing the interplay of
              light, texture, and emotion in the everyday. This quiet attention
              shapes work that feels both considered and alive, whether it's a
              brand system, a photographic series, or a collaborative concept.
            </p>
          </div>
        </div>
      </section>

      {/* 4 — Disciplines as a horizontal ticker-style row */}
      <section className="px-8 md:px-16 pb-24 md:pb-36">
        <div className="mb-16">
          <p className="text-xs tracking-widest uppercase text-muted-foreground">
            Disciplines
          </p>
          <div className="w-full h-px bg-border mt-4" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
          {[
            { num: "01", label: "Brand Identity", desc: "Visual systems that carry meaning and memory." },
            { num: "02", label: "Photography", desc: "Moments distilled into quiet, lasting frames." },
            { num: "03", label: "Creative Direction", desc: "Guiding vision from concept to craft." },
            { num: "04", label: "Editorial Design", desc: "Layouts that breathe, inform, and inspire." },
          ].map((item) => (
            <div
              key={item.num}
              className="bg-background p-6 md:p-8 flex flex-col justify-between min-h-[200px] group hover:bg-secondary/50 transition-colors duration-500"
            >
              <p className="text-xs text-muted-foreground/50 font-light">
                {item.num}
              </p>
              <div>
                <p className="text-xs tracking-widest uppercase text-foreground mb-2 group-hover:tracking-[0.2em] transition-all duration-500">
                  {item.label}
                </p>
                <p className="text-xs text-muted-foreground leading-[1.6] opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-h-0 group-hover:max-h-20 overflow-hidden">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
