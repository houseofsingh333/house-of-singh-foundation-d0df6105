import { useEffect, useRef, useState } from "react";

interface IntroOverlayProps {
  onComplete: () => void;
}

const IntroOverlay = ({ onComplete }: IntroOverlayProps) => {
  const [fadingOut, setFadingOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Check sessionStorage and prefers-reduced-motion
  const shouldSkip = () => {
    if (typeof window === "undefined") return true;
    if (sessionStorage.getItem("hos_intro_seen")) return true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
    return false;
  };

  const [skip] = useState(shouldSkip);

  useEffect(() => {
    if (skip) {
      sessionStorage.setItem("hos_intro_seen", "true");
      onComplete();
    }
  }, [skip, onComplete]);

  const handleEnded = () => {
    sessionStorage.setItem("hos_intro_seen", "true");
    setFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  if (skip) return null;

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center bg-background transition-opacity duration-500 ${
        fadingOut ? "opacity-0" : "opacity-100"
      }`}
      style={{ pointerEvents: fadingOut ? "none" : "auto" }}
    >
      {/* Centered video container */}
      <div className="relative w-[480px] max-w-[85vw] overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={handleEnded}
          className="w-full h-auto object-cover"
        >
          <source src="/HOS Logo Animation.mp4" type="video/mp4" />
        </video>
        {/* Edge feather mask */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: "inset 0 0 40px 20px hsl(var(--background))",
          }}
        />
      </div>
    </div>
  );
};

export default IntroOverlay;
