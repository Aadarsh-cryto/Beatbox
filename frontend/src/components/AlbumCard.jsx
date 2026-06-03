import { Link } from "react-router-dom";


function AlbumCard({ album }) {
  return (
    <Link to={`/album/${album._id}`} className="album-card-link">
      <div className="album-card">
        <h3 className="album-title">{album.title}</h3>
        <p className="album-artist">
          Artist: {album.artist?.username}
        </p>
      </div>
    </Link>
  );
}

export default AlbumCard;