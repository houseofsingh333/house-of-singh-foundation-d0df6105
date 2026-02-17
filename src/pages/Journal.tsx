import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { journalEntries } from "@/lib/mock-data";
import { format } from "date-fns";

const YEARS = [2026, 2025, 2024, 2023, 2022, 2021];
const MONTHS = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

const Journal = () => {
  const [activeYear, setActiveYear] = useState<number>(currentYear);
  const [activeMonth, setActiveMonth] = useState<number>(currentMonth);

  // Which months have entries for a given year
  const monthsWithEntries = useMemo(() => {
    const map: Record<number, Set<number>> = {};
    journalEntries.forEach((e) => {
      const d = new Date(e.publishedAt);
      const y = d.getFullYear();
      const m = d.getMonth() + 1;
      if (!map[y]) map[y] = new Set();
      map[y].add(m);
    });
    return map;
  }, []);

  const handleYearClick = (year: number) => {
    if (activeYear === year) return; // already open
    setActiveYear(year);
    // For current year, select current month; for past years, select December
    if (year === currentYear) {
      setActiveMonth(currentMonth);
    } else {
      setActiveMonth(12);
    }
  };

  const filtered = journalEntries.filter((e) => {
    const d = new Date(e.publishedAt);
    return d.getFullYear() === activeYear && d.getMonth() + 1 === activeMonth;
  });

  const heroEntry = filtered[0];
  const gridEntries = filtered.slice(1);

  return (
    <div className="px-8 md:px-16 py-16 max-w-[1400px] mx-auto">
      {/* Page Header */}
      <div className="mb-16">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Archive</p>
        <div className="w-full h-px bg-border mb-8" />
        <h1 className="font-editorial text-5xl md:text-7xl lg:text-8xl text-foreground tracking-tight">
          Journal
        </h1>
      </div>

      {/* Timeline Navigation */}
      <div className="mb-16 border-t border-border">
        {YEARS.map((year) => {
          const isOpen = activeYear === year;
          return (
            <div key={year} className="border-b border-border">
              <button
                onClick={() => handleYearClick(year)}
                className={`w-full flex items-center justify-between py-4 transition-colors group ${
                  isOpen ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="font-editorial text-2xl md:text-3xl tracking-tight">{year}</span>
                <span className={`text-xs uppercase tracking-[0.2em] transition-opacity ${
                  isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                }`}>
                  {isOpen ? "Open" : "Expand"}
                </span>
              </button>

              {/* Month Row */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-20 opacity-100 pb-5" : "max-h-0 opacity-0"
                }`}
              >
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {MONTHS.map((month) => {
                    const isActive = activeMonth === month;
                    const hasEntries = monthsWithEntries[year]?.has(month);
                    // For current year, future months are faded
                    const isFuture = year === currentYear && month > currentMonth;

                    return (
                      <button
                        key={month}
                        onClick={() => !isFuture && setActiveMonth(month)}
                        disabled={isFuture}
                        className={`text-xs uppercase tracking-[0.15em] px-3 py-1.5 border transition-all duration-200 ${
                          isActive
                            ? "bg-foreground text-background border-foreground"
                            : isFuture
                            ? "border-border text-muted-foreground/30 cursor-not-allowed"
                            : hasEntries
                            ? "border-border text-muted-foreground hover:text-foreground hover:border-foreground"
                            : "border-border text-muted-foreground/50 hover:text-muted-foreground hover:border-muted-foreground"
                        }`}
                      >
                        {MONTH_LABELS[month - 1]}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Articles */}
      {filtered.length === 0 ? (
        <p className="text-muted-foreground text-sm uppercase tracking-[0.2em] text-center py-24">
          No entries for {MONTH_LABELS[activeMonth - 1]} {activeYear}
        </p>
      ) : (
        <div className="space-y-16">
          {/* Hero Article */}
          {heroEntry && (
            <Link to={`/journal/${heroEntry.slug}`} className="block group">
              <div className="overflow-hidden bg-muted mb-6">
                <img
                  src={heroEntry.coverImage}
                  alt={heroEntry.title || heroEntry.excerpt}
                  className="w-full aspect-[16/9] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
              <div className="max-w-2xl">
                {heroEntry.title && (
                  <h2 className="text-xl md:text-2xl uppercase tracking-[0.15em] text-foreground font-light mb-3">
                    {heroEntry.title}
                  </h2>
                )}
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">{heroEntry.excerpt}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground/70 uppercase tracking-[0.15em]">
                    {format(new Date(heroEntry.publishedAt), "d MMMM yyyy")}
                  </p>
                  <span className="text-xs uppercase tracking-[0.2em] text-foreground border-b border-foreground pb-0.5 transition-opacity group-hover:opacity-70">
                    Read more
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Grid Articles */}
          {gridEntries.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14">
              {gridEntries.map((entry) => (
                <Link key={entry._id} to={`/journal/${entry.slug}`} className="block group">
                  <div className="overflow-hidden bg-muted mb-4">
                    <img
                      src={entry.coverImage}
                      alt={entry.title || entry.excerpt}
                      className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </div>
                  {entry.title && (
                    <h3 className="text-sm uppercase tracking-[0.15em] text-foreground font-light mb-2">
                      {entry.title}
                    </h3>
                  )}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-2">{entry.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground/70 uppercase tracking-[0.15em]">
                      {format(new Date(entry.publishedAt), "d MMMM yyyy")}
                    </p>
                    <span className="text-xs uppercase tracking-[0.2em] text-foreground border-b border-foreground pb-0.5 transition-opacity group-hover:opacity-70">
                      Read more
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Journal;
