import { X } from "lucide-react";
import { Link } from "react-router-dom";
import type { NavItem } from "@/lib/mock-data";

interface NavOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavItem[];
}

const NavOverlay = ({ isOpen, onClose, items }: NavOverlayProps) => {
  const sorted = [...items].sort((a, b) => a.order - b.order);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Slide-out panel */}
      <nav
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-background border-r border-border transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-end px-6 py-4">
          <button onClick={onClose} aria-label="Close menu" className="p-2 hover:opacity-70 transition-opacity">
            <X className="h-6 w-6 text-foreground" />
          </button>
        </div>

        <ul className="flex flex-col gap-1 px-6 pt-8">
          {sorted.map((item) => (
            <li key={item.label}>
              {item.externalUrl ? (
                <a
                  href={item.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="block py-3 text-lg tracking-wide text-foreground hover:text-muted-foreground transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  to={item.internalRoute || "/"}
                  onClick={onClose}
                  className="block py-3 text-lg tracking-wide text-foreground hover:text-muted-foreground transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default NavOverlay;
