import { Link } from "react-router-dom";
import { journalEntries } from "../lib/mock-data";

const HomeJournal = () => {
  const entries = journalEntries.slice(0, 3);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <section className="px-8 md:px-16 py-20 md:py-28">
      <div className="flex items-baseline justify-between mb-14">
        <h2 className="text-xs tracking-widest uppercase text-muted-foreground">
          Journal
        </h2>
        <Link
          to="/journal"
          className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
        >
          Browse all
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {entries.map((entry) => (
          <Link
            key={entry._id}
            to={`/journal/${entry.slug}`}
            className="group block"
          >
            <div className="aspect-[3/2] overflow-hidden bg-secondary mb-5">
              <img
                src={entry.coverImage}
                alt={entry.title || "Journal entry"}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
            </div>
            <time className="text-[11px] tracking-widest uppercase text-muted-foreground">
              {formatDate(entry.publishedAt)}
            </time>
            <p className="text-sm text-foreground leading-relaxed mt-2 line-clamp-2">
              {entry.title || entry.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HomeJournal;
