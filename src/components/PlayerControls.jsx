import React, { useState } from "react";

const PlayerControls = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="player-controls">
      <button
        className="control-button"
        onClick={() => console.log("Previous track")}
        title="Previous"
      >
        ⏮
      </button>
      <button
        className="play control-button"
        onClick={handlePlayPause}
        title={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? "⏸" : "▶"}
      </button>
      <button
        className="control-button"
        onClick={() => console.log("Next track")}
        title="Next"
      >
        ⏭
      </button>
    </div>
  );
};

export default PlayerControls;
