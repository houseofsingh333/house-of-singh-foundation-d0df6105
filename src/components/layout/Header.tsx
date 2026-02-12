import { Menu } from "lucide-react";

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header = ({ onMenuToggle }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-sm">
      <button
        onClick={onMenuToggle}
        aria-label="Open menu"
        className="p-2 hover:opacity-70 transition-opacity"
      >
        <Menu className="h-6 w-6 text-foreground" />
      </button>
      <a href="/" className="text-sm font-medium tracking-widest uppercase text-foreground">
        House of Singh
      </a>
      <div className="w-10" />
    </header>
  );
};

export default Header;
