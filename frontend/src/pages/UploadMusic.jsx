import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/UploadMusic.css";

function UploadMusic() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [albumId, setAlbumId] = useState("");

  // fetch albums
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res = await api.get("/music/getallalbums");
        setAlbums(res.data.albums);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAlbums();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("music", file);

      const res = await api.post("/music/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const musicId = res.data.music.id;

      // 👉 ADD TO ALBUM (IMPORTANT PART)
      if (albumId) {
        await api.post("/music/add-to-album", {
          albumId,
          musicId,
        });
      }

      alert("Music uploaded successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h2>🎤 Upload Music</h2>

        <form onSubmit={handleUpload}>
          <input
            type="text"
            placeholder="Song Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setFile(e.target.files[0])}
          />

          {/* ALBUM SELECT */}
          <select
            value={albumId}
            onChange={(e) => setAlbumId(e.target.value)}
          >
            <option value="">Select Album (optional)</option>

            {albums.map((album) => (
              <option key={album._id} value={album._id}>
                {album.title}
              </option>
            ))}
          </select>

          <button type="submit">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadMusic;