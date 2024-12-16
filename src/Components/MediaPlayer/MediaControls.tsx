import FullscreenButton from "../MediaControls/FullscreenButton.js";
import PauseButton from "../MediaControls/PauseButton.js";
import PlayButton from "../MediaControls/PlayButton.js";
import SkipButton from "../MediaControls/SkipButton.js";
import StopButton from "../MediaControls/StopButton.js";

function MediaControls({ state }: { state: "playing" | "paused" | "stopped" }) {
  return (
    <div className={`flex w-full gap-2`}>
      {state === "playing" && <PauseButton />}
      {state !== "playing" && <PlayButton />}
      <StopButton />
      <SkipButton />
      <FullscreenButton />
    </div>
  );
}

export default MediaControls;
