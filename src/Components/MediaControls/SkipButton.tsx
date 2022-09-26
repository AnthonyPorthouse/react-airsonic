import { SyntheticEvent } from "react";
import { useTranslation } from "react-i18next";

import { useTrackList } from "../../hooks";
import { ReactComponent as FastForward } from "../../images/fast-forward.svg";

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
      <FastForward className={`w-full`} />
    </button>
  );
}

export default SkipButton;
