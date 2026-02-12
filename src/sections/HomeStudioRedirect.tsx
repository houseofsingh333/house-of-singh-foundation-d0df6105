const HomeStudioRedirect = () => {
  return (
    <section className="px-6 py-16 text-center border-t border-neutral-200">
      <h2 className="text-2xl font-light tracking-wide text-black mb-4">Studio</h2>
      <p className="text-neutral-500 mb-6">Visit the studio site for more.</p>
      <a
        href="https://studios.houseofsingh.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block border border-black px-6 py-3 text-sm tracking-widest uppercase text-black hover:bg-black hover:text-white transition-colors"
      >
        Enter Studio
      </a>
    </section>
  );
};

export default HomeStudioRedirect;
