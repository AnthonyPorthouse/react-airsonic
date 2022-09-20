import { ReactComponent as Fullscreen } from "../../images/fullscreen.svg";
import { useTranslation } from "react-i18next";
import { SyntheticEvent } from "react";
import { useFullscreen } from "../MediaPlayer/FullscreenContext";

function FullscreenButton() {
  const { t } = useTranslation("media");
  const { isFullscreen, setIsFullscreen } = useFullscreen();

  const fullScreen = (e: SyntheticEvent) => {
    e.preventDefault();
    setIsFullscreen(!isFullscreen);
  };

  return (
    <button
      className={`inline-block w-12`}
      title={t(isFullscreen ? "exitFullscreen" : "enterFullscreen")}
      onClick={fullScreen}
    >
      <Fullscreen className={`w-full`} />
    </button>
  );
}

export default FullscreenButton;