import { useState } from "react";

type Reason = "project-query" | "collaboration" | "media" | "";

const Contact = () => {
  const [step, setStep] = useState(1);
  const [reason, setReason] = useState<Reason>("");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const reasons: { value: Reason; label: string }[] = [
    { value: "project-query", label: "Project Query" },
    { value: "collaboration", label: "Collaboration" },
    { value: "media", label: "Media" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production: POST to API route → Sanity mutation
    console.log("Contact submission:", { reason, ...formData });
    alert("Submission placeholder — will POST to Sanity in production.");
  };

  return (
    <div className="px-6 py-16 max-w-xl mx-auto">
      <h1 className="text-3xl font-light tracking-wide text-foreground mb-8">Contact</h1>

      {step === 1 && (
        <div>
          <p className="text-muted-foreground mb-6">What is this regarding?</p>
          <div className="space-y-3">
            {reasons.map((r) => (
              <button
                key={r.value}
                onClick={() => { setReason(r.value); setStep(2); }}
                className="block w-full text-left border border-border px-4 py-3 text-foreground hover:bg-muted/50 transition-colors"
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <p className="text-sm text-muted-foreground mb-4">
            Reason: <span className="text-foreground">{reasons.find((r) => r.value === reason)?.label}</span>
            <button type="button" onClick={() => setStep(1)} className="ml-2 underline text-muted-foreground text-xs">
              Change
            </button>
          </p>

          <div>
            <label className="block text-sm text-foreground mb-1">Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm text-foreground mb-1">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm text-foreground mb-1">Message</label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none"
              placeholder="Tell us more…"
            />
          </div>

          <button
            type="submit"
            className="border border-foreground px-6 py-3 text-sm tracking-widest uppercase text-foreground hover:bg-foreground hover:text-background transition-colors"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default Contact;
