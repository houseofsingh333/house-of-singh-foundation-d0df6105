import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="px-8 md:px-16 py-20 md:py-28 border-t border-border">
      {/* CTA */}
      <div className="mb-16">
        <p className="font-editorial text-2xl md:text-3xl lg:text-4xl font-light text-foreground leading-snug max-w-lg">
          Want to work together?
        </p>
        <Link
          to="/contact"
          className="inline-block mt-6 text-xs tracking-widest uppercase text-foreground border-b border-foreground/30 pb-1 hover:border-foreground transition-colors duration-300"
        >
          Get in touch
        </Link>
      </div>

      {/* Bottom row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-8 border-t border-border/50">
        <p className="text-[11px] tracking-widest uppercase text-muted-foreground">
          &copy; {new Date().getFullYear()} House of Singh
        </p>
        <div className="flex gap-6">
          <Link
            to="/about"
            className="text-[11px] tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            About
          </Link>
          <Link
            to="/projects"
            className="text-[11px] tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            Projects
          </Link>
          <Link
            to="/journal"
            className="text-[11px] tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            Journal
          </Link>
          <Link
            to="/contact"
            className="text-[11px] tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
