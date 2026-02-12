import { useParams, Link } from "react-router-dom";
import { journalEntries } from "@/lib/mock-data";
import { format } from "date-fns";

const JournalEntry = () => {
  const { slug } = useParams<{ slug: string }>();
  const entry = journalEntries.find((e) => e.slug === slug);

  if (!entry) {
    return (
      <div className="px-6 py-16 text-center">
        <h1 className="text-2xl text-foreground mb-4">Entry not found</h1>
        <Link to="/journal" className="text-muted-foreground underline">Back to journal</Link>
      </div>
    );
  }

  return (
    <div className="px-6 py-16 max-w-3xl mx-auto">
      <img src={entry.image} alt={entry.text} className="w-full h-[50vh] object-cover bg-muted mb-6" />
      <p className="text-lg text-foreground mb-2">{entry.text}</p>
      <p className="text-sm text-muted-foreground">
        {format(new Date(entry.createdAt), "d MMMM yyyy")}
      </p>
      <div className="mt-12">
        <Link to="/journal" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← Back to journal
        </Link>
      </div>
    </div>
  );
};

export default JournalEntry;
