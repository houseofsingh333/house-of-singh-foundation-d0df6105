import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", reason: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const reasons = ["Project Query", "Collaboration", "Media"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact submission:", formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="px-6 py-16 max-w-xl mx-auto text-center">
        <h1 className="text-3xl font-light tracking-wide text-foreground mb-4">Thank you</h1>
        <p className="text-muted-foreground">Your message has been received.</p>
      </div>
    );
  }

  return (
    <div className="px-6 py-16 max-w-xl mx-auto">
      <h1 className="text-3xl font-light tracking-wide text-foreground mb-8">Contact</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
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
          <label className="block text-sm text-foreground mb-1">Reason</label>
          <select
            required
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            className="w-full border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="">Select a reason</option>
            {reasons.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
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
    </div>
  );
};

export default Contact;
