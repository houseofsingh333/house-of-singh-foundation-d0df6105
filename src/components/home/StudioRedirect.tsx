const StudioRedirect = () => {
  return (
    <section className="px-6 py-16 text-center border-t border-border">
      <h2 className="text-2xl font-light tracking-wide text-foreground mb-4">Studio</h2>
      <p className="text-muted-foreground mb-6">
        Visit the studio site for more.
      </p>
      <a
        href="https://studios.houseofsingh.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block border border-foreground px-6 py-3 text-sm tracking-widest uppercase text-foreground hover:bg-foreground hover:text-background transition-colors"
      >
        Enter Studio
      </a>
    </section>
  );
};

export default StudioRedirect;
