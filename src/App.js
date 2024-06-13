import React, { useEffect, useState, useRef } from 'react';
import './App.css';

function App() {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    fetch('/songs.json')
      .then(response => response.json())
      .then(data => setSongs(data));
  }, []);

  const handlePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  const handleNext = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  const handlePrevious = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === 0 ? songs.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="App">
      {songs.length > 0 && (
        <div className="player">
          <h2>{songs[currentSongIndex].title}</h2>
          <h3>{songs[currentSongIndex].artist}</h3>
          <img src={songs[currentSongIndex].artwork} alt={songs[currentSongIndex].title} />
          <audio
            ref={audioRef}
            src={songs[currentSongIndex].url}
            controls
            autoPlay
          />
          <div className="controls">
            <button onClick={handlePrevious}>Previous</button>
            <button onClick={handlePlayPause}>Play/Pause</button>
            <button onClick={handleNext}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
