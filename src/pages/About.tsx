import { useState } from "react";
import portraitImage from "@/assets/maninder-portrait.jpg";
import hosLogo from "@/assets/house-of-singh-logo.png";

/* ——— Timeline data ——— */
const milestones = [
  {
    year: "2014",
    title: "Founded House of Singh",
    text: "Began the journey in New Delhi.",
    image: "/placeholder.svg",
  },
  {
    year: "2016",
    title: "First Brand Identity",
    text: "Delivered a full visual system for a heritage label.",
    image: "/placeholder.svg",
  },
  {
    year: "2018",
    title: "The Sikh Turban",
    text: "A personal project celebrating Sikh identity.",
    image: "/placeholder.svg",
  },
  {
    year: "2020",
    title: "Editorial & Print",
    text: "Expanded into editorial design and print storytelling.",
    image: "/placeholder.svg",
  },
  {
    year: "2021",
    title: "Relocation to Canada",
    text: "A new chapter rooted in Toronto.",
    image: "/placeholder.svg",
  },
  {
    year: "2024",
    title: "A Decade of Craft",
    text: "Ten years of evolving practice and perspective.",
    image: "/placeholder.svg",
  },
];

/* ——— Testimonial data ——— */
const testimonials = [
  {
    quote:
      "Working with Maninder felt less like a transaction and more like a conversation — one that left our brand feeling truly seen.",
    name: "Placeholder Name",
    role: "Creative Lead",
  },
  {
    quote:
      "He has a rare ability to listen deeply and translate feeling into form. The work speaks quietly but stays with you.",
    name: "Placeholder Name",
    role: "Brand Director",
  },
  {
    quote:
      "Every detail was intentional. The result was not just beautiful — it was meaningful.",
    name: "Placeholder Name",
    role: "Founder & CEO",
  },
];

const About = () => {
  const [activeTestimonial, setActiveTestimonial] = useState<number | null>(null);

  return (
    <div className="overflow-hidden">
      {/* ——— 1 · Intro Quote ——— */}
      <section className="px-8 md:px-16 pt-32 md:pt-44 pb-20 md:pb-28">
        <div className="max-w-4xl">
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-6">
            A Note
          </p>
          <p className="font-editorial text-xl md:text-2xl lg:text-[1.75rem] font-light leading-[1.6] text-foreground/70 editorial-fade-in max-w-2xl">
            "The world is filled with beauty, waiting to be seen, felt, and
            celebrated."
          </p>
        </div>
      </section>

      {/* ——— 2 · Founder Section — Stacked Editorial ——— */}
      <section className="px-8 md:px-16 pb-24 md:pb-36">
        {/* Full-width portrait */}
        <div className="w-full max-w-3xl aspect-[3/2] overflow-hidden bg-secondary mb-12 md:mb-16">
          <img
            src={portraitImage}
            alt="Maninder Singh — Creative Director, Designer & Photographer"
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Text below in narrow column */}
        <div className="max-w-xl">
          <h2 className="text-xs tracking-[0.25em] uppercase text-foreground mb-4">
            Maninder Singh
          </h2>
          <div className="space-y-1 mb-8">
            {["Creative Director", "Multidisciplinary Designer", "Photographer"].map(
              (role) => (
                <p
                  key={role}
                  className="font-editorial text-lg md:text-xl font-light text-muted-foreground leading-[1.5]"
                >
                  {role}
                </p>
              )
            )}
          </div>
          <div className="space-y-6">
            <p className="text-sm md:text-[15px] text-muted-foreground leading-[1.8]">
              Guided by a curiosity for life's quiet wonders, Maninder crafts
              narratives that celebrate the rhythm of nature and human
              connection. Based in Toronto, his work bridges the visual and the
              emotional, creating impactful stories through different mediums,
              including design and photography.
            </p>
            <p className="text-sm md:text-[15px] text-muted-foreground leading-[1.8]">
              Beyond his creative practice, he finds balance and inspiration in
              flying FPV drones, playing golf, and staying committed to fitness,
              grounding his work in discipline, movement, and reflection.
            </p>
          </div>
        </div>
      </section>

      {/* ——— 3 · House of Singh ——— */}
      <section className="px-8 md:px-16 py-24 md:py-36">
        <div className="max-w-4xl">
          <div className="flex items-start gap-8 md:gap-12 mb-12">
            {/* Logo */}
            <div className="w-20 md:w-28 flex-shrink-0 opacity-80">
              <img
                src={hosLogo}
                alt="House of Singh crest"
                className="w-full h-auto"
              />
            </div>
            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-foreground mb-4">
                House of Singh
              </p>
              <p className="font-editorial text-lg md:text-xl font-light text-muted-foreground leading-[1.5]">
                Estd. MMXIV
              </p>
            </div>
          </div>

          <div className="w-full h-px bg-border mb-12" />

          <div className="space-y-6 max-w-xl">
            <p className="text-sm md:text-[15px] text-muted-foreground leading-[1.8]">
              Under the identity of House of Singh, Maninder has created a platform
              where design, photography, and storytelling come together to inspire
              connection and reflection. It serves as a space to showcase an
              evolving body of work, spanning present explorations and future
              ventures across diverse mediums and collaborations.
            </p>
            <p className="text-sm md:text-[15px] text-muted-foreground leading-[1.8]">
              Guided by empathy and curiosity, House of Singh bridges the visual
              and emotional, crafting narratives that celebrate beauty, purpose, and
              meaning.
            </p>
          </div>
        </div>
      </section>

      {/* ——— 4 · Timeline — TEN YEARS ON ——— */}
      <section className="px-8 md:px-16 py-24 md:py-36">
        <div className="mb-16 max-w-4xl">
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-4">
            Ten Years On
          </p>
          <div className="w-full h-px bg-border" />
        </div>

        {/* Vertical timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Center line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          {milestones.map((m, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={m.year}
                className="timeline-milestone relative mb-14 last:mb-0 md:mb-0 md:min-h-[160px] group"
                tabIndex={0}
              >
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 top-3 -translate-x-1/2 z-10">
                  <div className="timeline-dot w-2 h-2 rounded-full bg-foreground/25 group-hover:bg-foreground/60 group-focus-within:bg-foreground/60" />
                </div>

                {/* Desktop: two-column grid */}
                <div className="hidden md:grid md:grid-cols-2 md:gap-0">
                  {/* Left column */}
                  <div className={`flex ${isEven ? "justify-end pr-12" : "justify-start pl-12"} ${!isEven ? "order-2" : "order-1"}`}>
                    {isEven ? (
                      <div className="timeline-content text-right max-w-[280px] py-4">
                        <p className="timeline-year font-editorial text-5xl font-light text-foreground leading-none mb-2">
                          {m.year}
                        </p>
                        <p className="text-[11px] tracking-[0.15em] uppercase text-foreground mb-1">
                          {m.title}
                        </p>
                        <p className="text-xs text-muted-foreground leading-[1.6]">
                          {m.text}
                        </p>
                      </div>
                    ) : (
                      <div className="timeline-image w-[220px] aspect-[4/3] overflow-hidden bg-secondary py-4">
                        <img
                          src={m.image}
                          alt={m.title}
                          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-[filter] duration-700"
                        />
                      </div>
                    )}
                  </div>

                  {/* Right column */}
                  <div className={`flex ${!isEven ? "justify-end pr-12" : "justify-start pl-12"} ${!isEven ? "order-1" : "order-2"}`}>
                    {isEven ? (
                      <div className="timeline-image w-[220px] aspect-[4/3] overflow-hidden bg-secondary py-4">
                        <img
                          src={m.image}
                          alt={m.title}
                          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-[filter] duration-700"
                        />
                      </div>
                    ) : (
                      <div className="timeline-content-reverse text-left max-w-[280px] py-4">
                        <p className="timeline-year font-editorial text-5xl font-light text-foreground leading-none mb-2">
                          {m.year}
                        </p>
                        <p className="text-[11px] tracking-[0.15em] uppercase text-foreground mb-1">
                          {m.title}
                        </p>
                        <p className="text-xs text-muted-foreground leading-[1.6]">
                          {m.text}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Mobile */}
                <div className="md:hidden pl-14">
                  <p className="timeline-year font-editorial text-4xl font-light text-foreground leading-none mb-2">
                    {m.year}
                  </p>
                  <p className="text-[11px] tracking-[0.15em] uppercase text-foreground mb-1">
                    {m.title}
                  </p>
                  <p className="text-xs text-muted-foreground leading-[1.6] mb-3">
                    {m.text}
                  </p>
                  <div className="w-[180px] aspect-[4/3] overflow-hidden bg-secondary">
                    <img
                      src={m.image}
                      alt={m.title}
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ——— 5 · Words Shared — Full-width stacked ——— */}
      <section className="px-8 md:px-16 py-24 md:py-36">
        <div className="mb-16 max-w-4xl">
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-4">
            Words Shared
          </p>
          <div className="w-full h-px bg-border" />
        </div>

        <div className="max-w-4xl space-y-0">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="group cursor-pointer"
              onMouseEnter={() => setActiveTestimonial(idx)}
              onMouseLeave={() => setActiveTestimonial(null)}
            >
              <div className="py-10 md:py-14 border-b border-border/50 transition-all duration-500">
                <div className="flex items-start gap-6 md:gap-10">
                  {/* Large quote number */}
                  <span className="font-editorial text-4xl md:text-6xl font-light text-foreground/10 leading-none flex-shrink-0 transition-colors duration-500 group-hover:text-foreground/30">
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  <div className="flex-1">
                    {/* Quote — always visible, expands on hover */}
                    <blockquote
                      className={`font-editorial text-lg md:text-xl lg:text-2xl font-light leading-[1.5] transition-all duration-500 ${
                        activeTestimonial === null || activeTestimonial === idx
                          ? "text-foreground"
                          : "text-foreground/20"
                      }`}
                    >
                      "{t.quote}"
                    </blockquote>

                    {/* Attribution — slides in on hover */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        activeTestimonial === idx
                          ? "max-h-20 opacity-100 mt-4"
                          : "max-h-0 opacity-0 mt-0"
                      }`}
                    >
                      <p className="text-xs tracking-[0.15em] uppercase text-foreground">
                        {t.name}
                      </p>
                      {t.role && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {t.role}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
