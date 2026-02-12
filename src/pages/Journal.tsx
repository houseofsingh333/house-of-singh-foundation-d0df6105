import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { journalEntries } from "@/lib/mock-data";
import { format } from "date-fns";

const Journal = () => {
  const [filter, setFilter] = useState<string>("all");

  const months = useMemo(() => {
    const set = new Set(journalEntries.map((e) => format(new Date(e.createdAt), "yyyy-MM")));
    return Array.from(set).sort().reverse();
  }, []);

  const filtered = filter === "all"
    ? journalEntries
    : journalEntries.filter((e) => format(new Date(e.createdAt), "yyyy-MM") === filter);

  return (
    <div className="px-6 py-16 max-w-4xl mx-auto">
      <h1 className="text-3xl font-light tracking-wide text-foreground mb-8">Journal</h1>

      {/* Date filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setFilter("all")}
          className={`text-sm px-3 py-1 border transition-colors ${
            filter === "all" ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground"
          }`}
        >
          All
        </button>
        {months.map((m) => (
          <button
            key={m}
            onClick={() => setFilter(m)}
            className={`text-sm px-3 py-1 border transition-colors ${
              filter === m ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground"
            }`}
          >
            {format(new Date(m + "-01"), "MMM yyyy")}
          </button>
        ))}
      </div>

      {/* Feed */}
      <div className="space-y-8">
        {filtered.map((entry) => (
          <Link
            key={entry._id}
            to={`/journal/${entry.slug}`}
            className="block border border-border p-4 hover:bg-muted/50 transition-colors"
          >
            <img src={entry.image} alt={entry.text} className="w-full h-64 object-cover bg-muted mb-3" />
            <p className="text-foreground">{entry.text}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {format(new Date(entry.createdAt), "d MMMM yyyy")}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Journal;
