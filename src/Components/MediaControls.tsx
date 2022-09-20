import AudioContext from "./Audio/AudioContext";
import PlayButton from "./MediaControls/PlayButton";
import PauseButton from "./MediaControls/PauseButton";
import StopButton from "./MediaControls/StopButton";
import SkipButton from "./MediaControls/SkipButton";
import { useContext } from "react";
import FullscreenButton from "./MediaControls/FullscreenButton";

function MediaControls() {
  const audio = useContext(AudioContext);

  const playPauseButton = () => {
    if (audio?.paused) {
      return <PlayButton />;
    }

    return <PauseButton />;
  };

  return (
    <div className={`flex w-full gap-2`}>
      {playPauseButton()}
      <StopButton />
      <SkipButton />
      <FullscreenButton />
    </div>
  );
}

export default MediaControls;
