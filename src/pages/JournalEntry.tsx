import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { journalEntries } from "@/lib/mock-data";
import { format } from "date-fns";

const JournalEntry = () => {
  const { slug } = useParams<{ slug: string }>();

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
    <div className="px-8 md:px-16 py-16 max-w-4xl mx-auto">
      <img src={entry.coverImage} alt={entry.title || entry.excerpt} className="w-full h-[50vh] object-cover bg-muted mb-8" />
      
      {entry.title && (
        <h1 className="font-editorial text-3xl md:text-4xl font-light tracking-wide text-foreground mb-3">{entry.title}</h1>
      )}
      <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-10">
        {format(new Date(entry.publishedAt), "d MMMM yyyy")}
      </p>

      {/* Body */}
      <div className="text-muted-foreground leading-relaxed space-y-4 mb-16">
        <p>{entry.body}</p>
      </div>

      {/* Back link */}
      <div className="mb-12">
        <Link to="/journal" className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors">
          ← Back to journal
        </Link>
      </div>

      {/* Prev / Next navigation */}
      <div className="border-t border-border pt-10">
        <div className="grid grid-cols-2 gap-8">
          {/* Previous (newer) */}
          <div>
            {prevEntry && (
              <Link to={`/journal/${prevEntry.slug}`} className="group block">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 mb-2">Previous</p>
                <p className="text-[11px] md:text-xs uppercase tracking-[0.12em] text-foreground group-hover:text-muted-foreground transition-colors leading-relaxed">
                  {prevEntry.title || "Untitled"}
                </p>
                <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground/50 mt-1">
                  {format(new Date(prevEntry.publishedAt), "d MMMM yyyy")}
                </p>
              </Link>
            )}
          </div>

          {/* Next (older) */}
          <div className="text-right">
            {nextEntry && (
              <Link to={`/journal/${nextEntry.slug}`} className="group block">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 mb-2">Next</p>
                <p className="text-[11px] md:text-xs uppercase tracking-[0.12em] text-foreground group-hover:text-muted-foreground transition-colors leading-relaxed">
                  {nextEntry.title || "Untitled"}
                </p>
                <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground/50 mt-1">
                  {format(new Date(nextEntry.publishedAt), "d MMMM yyyy")}
                </p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalEntry;
