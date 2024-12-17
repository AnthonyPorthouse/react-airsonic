import { useAudioRef } from "@hooks/useAudio";
import { useTrackList } from "@hooks/useTrackList";
import { Square } from "lucide-react";
import { SyntheticEvent } from "react";
import { useTranslation } from "react-i18next";

function StopButton() {
  const { t } = useTranslation("media");
  const audioRef = useAudioRef();
  const { setTrackList } = useTrackList();

  const stop = (e: SyntheticEvent) => {
    e.preventDefault();

    if (audioRef.current) {
      audioRef.current.pause();
      // eslint-disable-next-line react-compiler/react-compiler
      audioRef.current.currentTime = 0;
      setTrackList([]);
    }
  };

  return (
    <button
      className={`hidden w-12 md:block`}
      title={t("stopTrack")}
      onClick={stop}
    >
      <Square className={`w-full fill-black`} />
    </button>
  );
}

export default StopButton;
