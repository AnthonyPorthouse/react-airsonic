import { useAudioState } from "@hooks/useAudio.js";
import { useCallback } from "react";

import FullscreenButton from "../MediaControls/FullscreenButton.js";
import PauseButton from "../MediaControls/PauseButton.js";
import PlayButton from "../MediaControls/PlayButton.js";
import SkipButton from "../MediaControls/SkipButton.js";
import StopButton from "../MediaControls/StopButton.js";

function MediaControls() {
  const { isPaused } = useAudioState();

  const playPauseButton = useCallback(() => {
    if (isPaused) {
      return <PlayButton />;
    }

    return <PauseButton />;
  }, [isPaused]);

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
