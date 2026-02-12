const spotifyUrl = "https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M";

const HomeSpotify = () => {
  return (
    <section className="px-6 py-16 max-w-2xl mx-auto text-center">
      <h2 className="text-2xl font-light tracking-wide text-black mb-8">Listen</h2>
      <iframe
        src={spotifyUrl}
        width="100%"
        height="380"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="border-0 rounded"
        title="Spotify playlist"
      />
    </section>
  );
};

export default HomeSpotify;
