import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import MusicCard from "../components/MusicCard";
import "../styles/Home.css";

function AlbumDetails() {
  const { id } = useParams();   // ✅ FIXED
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    api.get(`/music/getalbums/${id}`)
      .then((res) => {
        setAlbum(res.data.album);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!album) return <p className="loading">Loading...</p>;

  return (
    <div className="home-container">

      <h1 className="home-title">💿 {album.title}</h1>

      <h2 className="section-title">🎵 Songs</h2>

      <div className="grid">
  {album.musics && album.musics.length > 0 &&
    album.musics.map((music) => (
      <MusicCard key={music._id} music={music} />
    ))
  }

  {album.musics && album.musics.length === 0 && (
    <p>No songs found in this album</p>
  )}
</div>

    </div>
  );
}

export default AlbumDetails;