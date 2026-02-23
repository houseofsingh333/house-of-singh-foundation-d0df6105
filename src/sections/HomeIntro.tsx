import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import portraitImage from "@/assets/maninder-portrait.jpg";

const HomeIntro = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="px-8 md:px-16 py-24 md:py-36">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-end">
        {/* Portrait — dominant, 7 columns, shorter aspect ratio */}
        <div
          className={`md:col-span-7 transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <div className="w-full aspect-[4/5] overflow-hidden bg-secondary">
            <img
              src={portraitImage}
              alt="Maninder Singh — Creative Director, Designer & Photographer"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        {/* Text — 4 columns, aligned to bottom */}
        <div className="md:col-span-4 md:col-start-9 flex flex-col gap-8 pb-2">
          <p
            className={`text-xs tracking-[0.25em] uppercase text-muted-foreground transition-all duration-700 ease-out delay-100 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            Maninder Singh
          </p>

          <div
            className={`space-y-0 transition-all duration-700 ease-out delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            {["Creative Director", "Multidisciplinary Designer", "Photographer"].map((role) => (
              <p
                key={role}
                className="font-editorial text-xl md:text-2xl font-light text-foreground leading-[1.5]"
              >
                {role}
              </p>
            ))}
          </div>

          <p
            className={`text-sm md:text-[15px] text-muted-foreground leading-[1.8] transition-all duration-700 ease-out delay-300 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            Based in Toronto, Maninder Singh crafts visual stories that sit
            between design, photography, and culture. Through House of Singh,
            his work spans brand identities, editorial narratives, and creative
            storytelling, always rooted in intention and thoughtful detail.
          </p>

          <Link
            to="/about"
            className={`inline-flex items-center gap-3 text-xs tracking-widest uppercase text-foreground group w-fit transition-all duration-700 ease-out delay-[400ms] ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <span className="border-b border-foreground/30 pb-1 group-hover:border-foreground transition-colors duration-300">
              About
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
