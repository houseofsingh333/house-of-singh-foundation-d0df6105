import portraitImage from "@/assets/maninder-portrait.jpg";

const About = () => {
  return (
    <div>
      {/* Hero section */}
      <section className="px-8 md:px-16 pt-32 pb-24 md:pb-36">
        <div className="mb-16">
          <p className="text-xs tracking-widest uppercase text-muted-foreground">
            About
          </p>
          <div className="w-full h-px bg-border mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Left — large editorial statement */}
          <div className="md:col-span-6">
            <h1 className="font-editorial text-3xl md:text-4xl lg:text-5xl font-light leading-[1.25] text-foreground">
              Creative Director.
              <br />
              Multidisciplinary Designer.
              <br />
              Photographer.
            </h1>
          </div>

          {/* Right — body copy */}
          <div className="md:col-span-5 md:col-start-8 flex flex-col gap-8 justify-end">
            <p className="text-sm md:text-[15px] text-muted-foreground leading-[1.8]">
              Guided by a deep curiosity for life's quiet wonders, creating work
              that reflects the rhythm of nature and human connection.
            </p>
          </div>
        </div>
      </section>

      {/* Portrait + extended bio */}
      <section className="px-8 md:px-16 pb-24 md:pb-36">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Portrait */}
          <div className="md:col-span-5">
            <div className="w-full aspect-[3/4] overflow-hidden bg-secondary">
              <img
                src={portraitImage}
                alt="Maninder Singh — Creative Director, Designer & Photographer"
                className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>

          {/* Extended bio */}
          <div className="md:col-span-5 md:col-start-7 flex flex-col gap-10 justify-center">
            <div className="space-y-6">
              <p className="text-sm md:text-[15px] text-muted-foreground leading-[1.8]">
                Based in Toronto, Maninder Singh blends design and photography to
                craft stories that feel both visually refined and emotionally
                resonant. As a creative director, multidisciplinary designer, and
                photographer, his practice spans brand identities, editorial work,
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
        </div>
      </section>

      {/* Philosophy / approach */}
      <section className="px-8 md:px-16 pb-24 md:pb-36">
        <div className="mb-16">
          <p className="text-xs tracking-widest uppercase text-muted-foreground">
            Approach
          </p>
          <div className="w-full h-px bg-border mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-6">
            <h2 className="font-editorial text-2xl md:text-3xl font-light leading-[1.3] text-foreground">
              Design is not decoration — it's a way of seeing the world and
              giving meaning to what we often overlook.
            </h2>
          </div>

          <div className="md:col-span-4 md:col-start-8 flex flex-col gap-8">
            {[
              { label: "Brand Identity", desc: "Visual systems that carry meaning and memory." },
              { label: "Photography", desc: "Moments distilled into quiet, lasting frames." },
              { label: "Creative Direction", desc: "Guiding vision from concept to craft." },
              { label: "Editorial Design", desc: "Layouts that breathe, inform, and inspire." },
            ].map((item) => (
              <div key={item.label} className="border-t border-border pt-4">
                <p className="text-xs tracking-widest uppercase text-foreground mb-2">
                  {item.label}
                </p>
                <p className="text-sm text-muted-foreground leading-[1.7]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
