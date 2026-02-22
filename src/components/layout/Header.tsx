import { useState } from "react";
import LanguageToggle from "@/components/LanguageToggle";

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header = ({ onMenuToggle }: HeaderProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/95 backdrop-blur-sm">
      {/* Dot menu trigger */}
      <button
        onClick={onMenuToggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Open menu"
        className="flex items-center gap-2 group w-14"
      >
        <span className="block w-2.5 h-2.5 rounded-full bg-foreground" />
        <span
          className={`text-xs tracking-widest uppercase text-foreground transition-all duration-300 ${
            hovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
          }`}
        >
          Menu
        </span>
      </button>

      {/* Centered wordmark */}
      <a
        href="/"
        className="absolute left-1/2 -translate-x-1/2 text-sm font-medium tracking-widest uppercase text-foreground"
      >
        House of Singh
      </a>

      {/* Language toggle */}
      <LanguageToggle />
    </header>
  );
};

export default Header;
