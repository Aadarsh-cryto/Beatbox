import "../styles/Home.css";

function MusicCard({ music }) {
  return (
    <div className="music-card">
      <h3 className="music-title">{music.title}</h3>

      <p className="music-artist">
        Artist: {music.artist?.username}
      </p>

      <audio className="music-audio" controls>
        <source src={music.uri} />
      </audio>
    </div>
  );
}

export default MusicCard;