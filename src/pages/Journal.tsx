import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { journalEntries } from "@/lib/mock-data";
import { format } from "date-fns";

const YEARS = [2026, 2025, 2024, 2023, 2022, 2021];
const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

const Journal = () => {
  const [activeYear, setActiveYear] = useState<number>(currentYear);
  const [activeMonth, setActiveMonth] = useState<number>(currentMonth);

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
    if (activeYear === year) {
      // Collapse — deselect
      setActiveYear(-1);
      return;
    }
    setActiveYear(year);
    if (year === currentYear) {
      setActiveMonth(currentMonth);
    } else {
      setActiveMonth(12);
    }
  };

  const filtered = activeYear === -1
    ? []
    : journalEntries.filter((e) => {
        const d = new Date(e.publishedAt);
        return d.getFullYear() === activeYear && d.getMonth() + 1 === activeMonth;
      });

  return (
    <div className="overflow-hidden">
      {/* Page Header — consistent with About page pattern */}
      <section className="px-8 md:px-16 pt-32 md:pt-44 pb-16 md:pb-20">
        <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-4">Archive</p>
        <div className="w-full h-px bg-border mb-10" />
        <h1 className="font-editorial text-5xl md:text-7xl lg:text-[6rem] font-light text-foreground leading-none">
          Journal
        </h1>
      </section>

      {/* ——— Horizontal Timeline ——— */}
      <section className="px-8 md:px-16 pb-20 md:pb-28">
        {/* Scrollable horizontal line with year dots */}
        <div className="relative overflow-x-auto scrollbar-hide">
          <div className="relative min-w-max">
            {/* The line */}
            <div className="absolute top-[5px] left-0 right-0 h-px bg-border" />

            {/* Year markers along the line */}
            <div className="flex items-start">
              {YEARS.map((year, i) => {
                const isActive = activeYear === year;
                return (
                  <button
                    key={year}
                    onClick={() => handleYearClick(year)}
                    className={`flex flex-col items-center group ${
                      i < YEARS.length - 1 ? "min-w-[100px] md:min-w-[140px]" : ""
                    }`}
                  >
                    {/* Dot on the line */}
                    <div
                      className={`w-[10px] h-[10px] rounded-full transition-all duration-300 ${
                        isActive
                          ? "bg-foreground scale-125"
                          : "bg-border group-hover:bg-foreground/50"
                      }`}
                    />
                    {/* Year label below */}
                    <span
                      className={`font-editorial text-sm md:text-base mt-3 transition-all duration-300 ${
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground/40 group-hover:text-muted-foreground"
                      }`}
                    >
                      {year}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Expanded months row — slides open below active year */}
          <div
            className={`overflow-hidden transition-all duration-400 ease-in-out ${
              activeYear > 0 ? "max-h-24 opacity-100 mt-8" : "max-h-0 opacity-0 mt-0"
            }`}
          >
            <div className="flex items-center gap-4 md:gap-6 flex-wrap">
              {MONTHS.map((month) => {
                const isActive = activeMonth === month;
                const isFuture = activeYear === currentYear && month > currentMonth;
                const hasEntries = monthsWithEntries[activeYear]?.has(month);

                return (
                  <button
                    key={month}
                    onClick={() => !isFuture && setActiveMonth(month)}
                    disabled={isFuture}
                    className={`text-xs tracking-[0.15em] uppercase transition-all duration-200 pb-0.5 ${
                      isActive
                        ? "text-foreground border-b border-foreground"
                        : isFuture
                        ? "text-muted-foreground/20 cursor-not-allowed"
                        : hasEntries
                        ? "text-muted-foreground/60 hover:text-foreground border-b border-transparent hover:border-foreground"
                        : "text-muted-foreground/30 hover:text-muted-foreground/60 border-b border-transparent"
                    }`}
                  >
                    {MONTH_LABELS[month - 1]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ——— Article Grid — Sjostrand-inspired ——— */}
      <section className="px-8 md:px-16 pb-24 md:pb-36">
        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-sm text-muted-foreground/60 uppercase tracking-[0.2em]">
              {activeYear === -1
                ? "Select a year to browse entries"
                : `No entries for ${MONTH_LABELS[activeMonth - 1]} ${activeYear}`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-14">
            {filtered.map((entry) => (
              <Link
                key={entry._id}
                to={`/journal/${entry.slug}`}
                className="block group"
              >
                {/* Image */}
                <div className="overflow-hidden bg-secondary mb-5">
                  <img
                    src={entry.coverImage}
                    alt={entry.title || entry.excerpt}
                    className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>

                {/* Date */}
                <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-2">
                  {format(new Date(entry.publishedAt), "d MMMM yyyy")}
                </p>

                {/* Title */}
                {entry.title && (
                  <h2 className="text-[11px] md:text-xs uppercase tracking-[0.15em] text-foreground font-normal leading-[1.6] mb-2">
                    {entry.title}
                  </h2>
                )}

                {/* Excerpt */}
                <p className="text-[11px] text-muted-foreground/70 leading-relaxed mb-3">
                  {entry.excerpt}
                </p>

                {/* Read more */}
                <span className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground group-hover:text-foreground transition-colors duration-300 border-b border-muted-foreground/30 group-hover:border-foreground pb-px">
                  Read more
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Journal;
