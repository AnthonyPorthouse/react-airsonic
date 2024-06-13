import { ForwardIcon } from "@heroicons/react/24/solid";
import { useTrackList } from "@providers/TrackListProvider.js";
import { SyntheticEvent } from "react";
import { useTranslation } from "react-i18next";

function SkipButton() {
  const { t } = useTranslation("media");
  const { nextTrack } = useTrackList();

  const skipTrack = (e: SyntheticEvent) => {
    e.preventDefault();
    nextTrack();
  };

  return (
    <button
      onClick={skipTrack}
      className={`inline-block w-12`}
      title={t("nextTrack")}
    >
      <ForwardIcon className={`w-full`} />
    </button>
  );
}

export default SkipButton;
