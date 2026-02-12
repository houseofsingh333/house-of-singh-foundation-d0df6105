const HomeStudioRedirect = () => {
  return (
    <section className="px-8 md:px-16 py-20 md:py-28 border-t border-border">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">
            Subsidiary
          </p>
          <h3 className="font-editorial text-xl md:text-2xl font-light text-foreground">
            Studios
          </h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-md">
            Commercial work and client projects live on a separate site.
          </p>
        </div>
        <a
          href="https://studios.houseofsingh.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-xs tracking-widest uppercase text-foreground border border-foreground/20 px-8 py-4 hover:bg-foreground hover:text-background transition-all duration-500"
        >
          Visit Studio →
        </a>
      </div>
    </section>
  );
};

export default HomeStudioRedirect;
