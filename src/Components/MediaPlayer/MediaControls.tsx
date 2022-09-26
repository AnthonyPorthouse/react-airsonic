import { useContext } from "react";

import AudioContext from "../Audio/AudioContext";
import FullscreenButton from "../MediaControls/FullscreenButton";
import PauseButton from "../MediaControls/PauseButton";
import PlayButton from "../MediaControls/PlayButton";
import SkipButton from "../MediaControls/SkipButton";
import StopButton from "../MediaControls/StopButton";

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
