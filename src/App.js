import React, { useEffect, useState, useRef } from 'react';
import './App.css';

function App() {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    fetch('/songs.json')
      .then(response => response.json())
      .then(data => setSongs(data));
  }, []);

  const handlePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleNext = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    setIsPlaying(false);
  };

  const handlePrevious = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === 0 ? songs.length - 1 : prevIndex - 1
    );
    setIsPlaying(false);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentSongIndex]);

  return (
    <div className="App">
      {songs.length > 0 && (
        <div className="player">
          <h2>{songs[currentSongIndex].title}</h2>
          <h3>{songs[currentSongIndex].artist}</h3>
          <img src={songs[currentSongIndex].artwork} alt={songs[currentSongIndex].title} />
          <div className='audio'>
          <audio
            ref={audioRef}
            src={songs[currentSongIndex].url}
            controls
          />
          </div>
          
          <div className="controls">
            <button onClick={handlePrevious}><i className="fas fa-backward"></i></button>
            <button onClick={handlePlayPause}>
              {isPlaying ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>}
            </button>
            <button onClick={handleNext}><i className="fas fa-forward"></i></button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
