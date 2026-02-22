import { useState } from "react";

interface LanguageToggleProps {
  defaultLang?: "en" | "pa";
  onChange?: (lang: "en" | "pa") => void;
}

const LanguageToggle = ({ defaultLang = "en", onChange }: LanguageToggleProps) => {
  const [lang, setLang] = useState<"en" | "pa">(defaultLang);
  const isEnglish = lang === "en";

  const toggle = (selected: "en" | "pa") => {
    if (selected !== lang) {
      setLang(selected);
      onChange?.(selected);
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={!isEnglish}
      aria-label={`Language: ${isEnglish ? "English" : "Punjabi"}`}
      onClick={() => toggle(isEnglish ? "pa" : "en")}
      className="relative inline-flex items-center h-7 w-14 rounded-full border border-foreground bg-background 
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background
                 cursor-pointer select-none"
    >
      {/* Sliding knob */}
      <span
        className="absolute top-0.5 left-0.5 h-[22px] w-[22px] rounded-full bg-foreground transition-transform duration-200 ease-out"
        style={{
          transform: isEnglish ? "translateX(0)" : "translateX(26px)",
        }}
      />

      {/* E label */}
      <span
        className={`relative z-10 flex-1 text-center text-[11px] font-medium leading-none transition-colors duration-200 ${
          isEnglish ? "text-background" : "text-foreground"
        }`}
      >
        E
      </span>

      {/* ਪ label */}
      <span
        className={`relative z-10 flex-1 text-center text-[11px] font-medium leading-none transition-colors duration-200 ${
          !isEnglish ? "text-background" : "text-foreground"
        }`}
      >
        ਪ
      </span>
    </button>
  );
};

export default LanguageToggle;
