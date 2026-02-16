import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import portraitImage from "@/assets/maninder-portrait.jpg";

/* ——— Timeline data ——— */
const milestones = [
  {
    year: "2014",
    title: "Founded House of Singh",
    text: "Began the journey in New Delhi.",
  },
  {
    year: "2016",
    title: "First Brand Identity",
    text: "Delivered a full visual system for a heritage label.",
  },
  {
    year: "2018",
    title: "The Sikh Turban",
    text: "A personal project celebrating Sikh identity.",
  },
  {
    year: "2020",
    title: "Editorial & Print",
    text: "Expanded into editorial design and print storytelling.",
  },
  {
    year: "2021",
    title: "Relocation to Canada",
    text: "A new chapter rooted in Toronto.",
  },
  {
    year: "2024",
    title: "A Decade of Craft",
    text: "Ten years of evolving practice and perspective.",
  },
];

/* ——— Testimonial data (placeholders — final copy to be provided) ——— */
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
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const prevTestimonial = () =>
    setTestimonialIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const nextTestimonial = () =>
    setTestimonialIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  return (
    <div className="overflow-hidden">
      {/* ——— 1 · Intro Quote ——— */}
      <section className="px-8 md:px-16 pt-32 md:pt-44 pb-24 md:pb-36 flex items-center justify-center">
        <p className="font-editorial text-2xl md:text-3xl lg:text-[2.5rem] font-light leading-[1.4] text-center max-w-3xl editorial-fade-in">
          "The world is filled with beauty, waiting to be seen, felt, and
          celebrated."
        </p>
      </section>

      {/* ——— 2 · Founder Section ——— */}
      <section className="px-8 md:px-16 pb-24 md:pb-36">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
          {/* Text — left */}
          <div className="md:col-span-6 flex flex-col gap-10 order-2 md:order-1">
            <div>
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
              <div className="space-y-6 max-w-md">
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
          </div>

          {/* Portrait — right */}
          <div className="md:col-span-5 md:col-start-8 order-1 md:order-2">
            <div className="w-full aspect-[3/4] overflow-hidden bg-secondary">
              <img
                src={portraitImage}
                alt="Maninder Singh — Creative Director, Designer & Photographer"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ——— 3 · House of Singh ——— */}
      <section className="px-8 md:px-16 py-24 md:py-36">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-4">
            House of Singh
          </p>
          <div className="w-full h-px bg-border mb-12" />

          <div className="space-y-6">
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
        <div className="mb-16">
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-4">
            Ten Years On
          </p>
          <div className="w-full h-px bg-border" />
        </div>

        {/* Vertical timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Center line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          {milestones.map((m, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={m.year}
                className={`relative flex items-start mb-12 last:mb-0 md:mb-16 ${
                  isEven
                    ? "md:flex-row"
                    : "md:flex-row-reverse"
                }`}
              >
                {/* Dot on the line */}
                <div className="absolute left-6 md:left-1/2 top-2 w-2.5 h-2.5 rounded-full bg-foreground/30 -translate-x-1/2 z-10" />

                {/* Content */}
                <div
                  className={`pl-14 md:pl-0 md:w-[calc(50%-2rem)] ${
                    isEven
                      ? "md:pr-12 md:text-right"
                      : "md:pl-12 md:text-left"
                  }`}
                >
                  <p className="font-editorial text-4xl md:text-6xl font-light text-foreground/15 leading-none mb-3">
                    {m.year}
                  </p>
                  <p className="text-xs tracking-[0.15em] uppercase text-foreground mb-1">
                    {m.title}
                  </p>
                  <p className="text-xs text-muted-foreground leading-[1.6] max-w-[240px] inline-block">
                    {m.text}
                  </p>
                </div>

                {/* Spacer for the other side */}
                <div className="hidden md:block md:w-[calc(50%-2rem)]" />
              </div>
            );
          })}
        </div>
      </section>

      {/* ——— 5 · Words Shared ——— */}
      <section className="px-8 md:px-16 py-24 md:py-36">
        <div className="mb-12">
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-4">
            Words Shared
          </p>
          <div className="w-full h-px bg-border" />
        </div>

        <div className="max-w-2xl mx-auto text-center">
          <blockquote className="font-editorial text-xl md:text-2xl font-light leading-[1.5] text-foreground mb-8 min-h-[120px] flex items-center justify-center">
            "{testimonials[testimonialIndex].quote}"
          </blockquote>
          <p className="text-xs tracking-[0.15em] uppercase text-foreground">
            {testimonials[testimonialIndex].name}
          </p>
          {testimonials[testimonialIndex].role && (
            <p className="text-xs text-muted-foreground mt-1">
              {testimonials[testimonialIndex].role}
            </p>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={prevTestimonial}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-xs text-muted-foreground tabular-nums">
              {testimonialIndex + 1} / {testimonials.length}
            </span>
            <button
              onClick={nextTestimonial}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
