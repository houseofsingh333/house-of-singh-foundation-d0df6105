import { siteSettings } from "../lib/mock-data";

const HomeSpotify = () => {
  return (
    <section className="px-8 md:px-16 py-20 md:py-28 max-w-3xl">
      <p className="text-xs tracking-widest uppercase text-muted-foreground mb-10">
        Now Playing
      </p>
      <iframe
        src={siteSettings.spotifyPlaylistUrl}
        width="100%"
        height="152"
        allow="encrypted-media"
        loading="lazy"
        className="border-0 opacity-80 hover:opacity-100 transition-opacity duration-500"
        title="Spotify playlist"
      />
    </section>
  );
};

export default HomeSpotify;
