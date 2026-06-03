import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Home.css";

import MusicCard from "../components/MusicCard";
import AlbumCard from "../components/AlbumCard";

function Home() {
  const [musics, setMusics] = useState([]);
  const [albums, setAlbums] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

    api.get("/music")
      .then((res) => setMusics(res.data.musics))
      .catch(() => setMusics([]));

    api.get("/music/getallalbums")
      .then((res) => setAlbums(res.data.albums))
      .catch(() => setAlbums([]));
  }, [user]);

  return (
    <div className="home-container">

      <div className="hero-section">
        <div className="hero-overlay">
          <h1 className="hero-title">🎧 Feel The Music</h1>

          <p className="hero-subtitle">
            Discover trending songs, explore albums,
            and enjoy music uploaded by talented artists.
          </p>
        </div>
      </div>

      {/* GUEST USER */}
      {!user ? (
        <>
          <h2 className="section-title">🔥 Latest Features</h2>

          <div className="grid">
            <div className="feature-card compact-card">
              <h3>🎵 Unlimited Music</h3>
            </div>

            <div className="feature-card compact-card">
              <h3>💿 Albums Collection</h3>
            </div>

            <div className="feature-card compact-card">
              <h3>🎤 Artist Uploads</h3>
            </div>
          </div>

          <h2 className="section-title">💿 Popular Collections</h2>

          <div className="grid">
            <div className="feature-card compact-card">
              <h3>🎶 Pop Songs</h3>
            </div>

            <div className="feature-card compact-card">
              <h3>🎸 90's Songs</h3>
            </div>

            <div className="feature-card compact-card">
              <h3>🔥 Trending Songs</h3>
            </div>
          </div>
        </>
      ) : (
        <>
          <h2 className="section-title">🔥 Latest Music</h2>

          <div className="grid">
            {musics.map((music) => (
              <MusicCard key={music._id} music={music} />
            ))}
          </div>

          <h2 className="section-title">💿 Albums</h2>

          <div className="grid">
            {albums.map((album) => (
              <AlbumCard key={album._id} album={album} />
            ))}
          </div>
        </>
      )}

    </div>
  );
}

export default Home;