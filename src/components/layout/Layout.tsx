import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import NavOverlay from "./NavOverlay";
import Footer from "./Footer";
import IntroOverlay from "@/components/IntroOverlay";
import { navigation } from "@/lib/mock-data";

const Layout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [introComplete, setIntroComplete] = useState(() =>
    !!sessionStorage.getItem("hos_intro_seen")
  );

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {!introComplete && (
        <IntroOverlay onComplete={() => setIntroComplete(true)} />
      )}
      <Header
        onMenuToggle={() => setMenuOpen(true)}
        introComplete={introComplete}
      />
      <NavOverlay
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={navigation}
      />
      <main
        className={`flex-1 transition-opacity duration-500 ${
          introComplete ? "opacity-100" : "opacity-0"
        }`}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
