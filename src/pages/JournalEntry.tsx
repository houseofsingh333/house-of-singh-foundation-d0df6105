import { useMemo, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { journalEntries } from "@/lib/mock-data";
import { format } from "date-fns";
import { Progress } from "@/components/ui/progress";

const JournalEntry = () => {
  const { slug } = useParams<{ slug: string }>();
  const [readProgress, setReadProgress] = useState(0);

  // Reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setReadProgress(Math.min((scrollTop / docHeight) * 100, 100));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sorted = useMemo(
    () => [...journalEntries].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()),
    []
  );

  const currentIndex = sorted.findIndex((e) => e.slug === slug);
  const entry = currentIndex >= 0 ? sorted[currentIndex] : undefined;
  const prevEntry = currentIndex > 0 ? sorted[currentIndex - 1] : undefined;
  const nextEntry = currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : undefined;

  if (!entry) {
    return (
      <div className="px-6 py-16 text-center">
        <h1 className="text-2xl text-foreground mb-4">Entry not found</h1>
        <Link to="/journal" className="text-muted-foreground underline">Back to journal</Link>
      </div>
    );
  }

  return (
    <>
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Progress value={readProgress} className="h-[2px] rounded-none bg-transparent" />
      </div>

      <div className="px-8 md:px-16 pt-32 md:pt-40 pb-16 max-w-4xl mx-auto">
        {/* Back to journal */}
        <Link
          to="/journal"
          className="inline-block text-[11px] uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          ← Back to journal
        </Link>

        <img src={entry.coverImage} alt={entry.title || entry.excerpt} className="w-full h-[50vh] object-cover bg-muted mb-8" />

        {entry.title && (
          <h1 className="font-editorial text-3xl md:text-4xl font-light tracking-wide text-foreground mb-3">{entry.title}</h1>
        )}
        <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-10">
          {format(new Date(entry.publishedAt), "d MMMM yyyy")}
        </p>

        {/* Body */}
        <div className="text-muted-foreground leading-relaxed space-y-6 mb-16">
          {entry.body.split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {/* Prev / Next navigation */}
        <div className="border-t border-border pt-10">
          <div className="grid grid-cols-2 gap-8">
            {/* Previous (newer) */}
            <div>
              {prevEntry ? (
                <Link to={`/journal/${prevEntry.slug}`} className="group block">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 mb-1">Previous</p>
                  <p className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground/30 mb-2">Newer entry</p>
                  <p className="text-[11px] md:text-xs uppercase tracking-[0.12em] text-foreground group-hover:text-muted-foreground transition-colors leading-relaxed">
                    {prevEntry.title || "Untitled"}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground/50 mt-1">
                    {format(new Date(prevEntry.publishedAt), "d MMMM yyyy")}
                  </p>
                </Link>
              ) : (
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/20">No previous entry</p>
              )}
            </div>

            {/* Next (older) */}
            <div className="text-right">
              {nextEntry ? (
                <Link to={`/journal/${nextEntry.slug}`} className="group block">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 mb-1">Next</p>
                  <p className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground/30 mb-2">Older entry</p>
                  <p className="text-[11px] md:text-xs uppercase tracking-[0.12em] text-foreground group-hover:text-muted-foreground transition-colors leading-relaxed">
                    {nextEntry.title || "Untitled"}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground/50 mt-1">
                    {format(new Date(nextEntry.publishedAt), "d MMMM yyyy")}
                  </p>
                </Link>
              ) : (
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/20">No next entry</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JournalEntry;
