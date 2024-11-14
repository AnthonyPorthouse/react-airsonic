import { useTrackList } from "@hooks/useTrackList";
import { SkipForward } from "lucide-react";
import { SyntheticEvent, memo } from "react";
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
      <SkipForward fill="#000" className={`w-full`} />
    </button>
  );
}

export default memo(SkipButton);
