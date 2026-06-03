import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/CreateAlbum.css";

function CreateAlbum() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [musics, setMusics] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const musicArray = musics
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean);

      const res = await api.post("/music/album", {
        title,
        musics: musicArray,
      });

      alert(res.data.message);

      setTitle("");
      setMusics("");

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Album create failed");
    }
  };

  return (
    <div className="create-album-container">
      <div className="create-album-card">
        <h2>💿 Create Album</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Album Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Music IDs (comma separated)"
            value={musics}
            onChange={(e) => setMusics(e.target.value)}
            required
          />

          <button type="submit">
            Create Album
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateAlbum;