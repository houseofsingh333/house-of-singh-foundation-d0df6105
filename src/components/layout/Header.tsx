import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import CrestPlaceholder from "@/components/CrestPlaceholder";

interface HeaderProps {
  onMenuToggle: () => void;
  introComplete: boolean;
}

const Header = ({ onMenuToggle, introComplete }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled((prev) => {
        if (!prev && y >= 60) return true;
        if (prev && y <= 20) return false;
        return prev;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  if (!introComplete) return null;

  return (
    <>
      {/* State 2: Scrolled strip */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-[68px] flex items-center justify-between px-6 transition-all duration-500 ${
          scrolled
            ? "bg-background/95 backdrop-blur-sm border-b border-border opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <button
          onClick={onMenuToggle}
          aria-label="Open menu"
          className="flex items-center"
        >
          <span className="block w-2.5 h-2.5 rounded-full bg-foreground" />
        </button>

        <span className="text-xs font-medium tracking-[0.25em] uppercase text-foreground">
          House of Singh
        </span>

        <button onClick={toggleTheme} aria-label="Toggle dark mode">
          {isDark ? (
            <Sun className="h-4 w-4 text-foreground" />
          ) : (
            <Moon className="h-4 w-4 text-foreground" />
          )}
        </button>
      </header>

      {/* State 1: Top — crest + controls, no background */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "opacity-0 translate-y-2 pointer-events-none"
            : "opacity-100 translate-y-0"
        }`}
      >
        {/* Controls row */}
        <div className="flex items-center justify-between px-6 py-5">
          <button
            onClick={onMenuToggle}
            aria-label="Open menu"
            className="flex items-center"
          >
            <span className="block w-2.5 h-2.5 rounded-full bg-foreground" />
          </button>

          <button onClick={toggleTheme} aria-label="Toggle dark mode">
            {isDark ? (
              <Sun className="h-4 w-4 text-foreground" />
            ) : (
              <Moon className="h-4 w-4 text-foreground" />
            )}
          </button>
        </div>

        {/* Crest centered, 32px from top */}
        <div className="flex justify-center -mt-3">
          <CrestPlaceholder width={250} className="text-foreground" />
        </div>
      </div>
    </>
  );
};

export default Header;
