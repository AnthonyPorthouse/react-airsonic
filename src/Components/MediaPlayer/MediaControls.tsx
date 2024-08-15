import { useAudio } from "@/Providers/AudioProvider.js";

import FullscreenButton from "../MediaControls/FullscreenButton.js";
import PauseButton from "../MediaControls/PauseButton.js";
import PlayButton from "../MediaControls/PlayButton.js";
import SkipButton from "../MediaControls/SkipButton.js";
import StopButton from "../MediaControls/StopButton.js";

function MediaControls() {
  const audio = useAudio();

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
