import { StopIcon } from "@heroicons/react/24/solid";
import { SyntheticEvent, useContext } from "react";
import { useTranslation } from "react-i18next";

import { useTrackList } from "../../Providers/TrackListProvider.js";
import AudioContext from "../Audio/AudioContext.js";

function StopButton() {
  const { t } = useTranslation("media");
  /**
   * @type audio {Audio}
   */
  const audio = useContext(AudioContext);
  const { setTrackList } = useTrackList();

  const stop = (e: SyntheticEvent) => {
    e.preventDefault();
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setTrackList([]);
    }
  };

  return (
    <button
      className={`inline-block w-12 hidden md:block`}
      title={t("stopTrack")}
      onClick={stop}
    >
      <StopIcon className={`w-full`} />
    </button>
  );
}

export default StopButton;
