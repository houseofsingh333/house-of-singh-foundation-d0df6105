const HomeSpotify = () => {
  return (
    <section className="px-8 md:px-16 py-20 md:py-28 max-w-5xl">
      <p className="text-xs tracking-widest uppercase text-muted-foreground mb-10">
        Now Playing
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Spotify embed */}
        <iframe
          src="https://open.spotify.com/embed/playlist/5siljeAcGgaINDEqVRBsAg?utm_source=generator"
          width="100%"
          height="152"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="border-0 opacity-80 hover:opacity-100 transition-opacity duration-500"
          title="Spotify playlist"
        />

        {/* Text */}
        <div>
          <h3 className="font-editorial text-xl md:text-2xl font-light text-foreground leading-snug">
            The Sounds Behind the Work
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mt-3 max-w-sm">
            This playlist showcases the music that keeps me inspired and in sync with my work.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeSpotify;
