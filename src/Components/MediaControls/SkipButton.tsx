import { ReactComponent as FastForward } from "../../images/fast-forward.svg";
import { getNextTrack } from "../../app/features/playlistSlice";
import { SyntheticEvent } from "react";
import { useAppDispatch } from "../../app/hooks";
import { useTranslation } from "react-i18next";

function SkipButton() {
  const { t } = useTranslation("media");
  const dispatch = useAppDispatch();
  /**
   * @type audio {Audio}
   */

  const skipTrack = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(getNextTrack());
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
