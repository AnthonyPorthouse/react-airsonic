import { useFullscreen } from "@hooks/useFullscreen";
import { Fullscreen, Shrink } from "lucide-react";
import { SyntheticEvent } from "react";
import { useTranslation } from "react-i18next";

function FullscreenButton() {
  const { t } = useTranslation("media");
  const { isFullscreen, setIsFullscreen } = useFullscreen();

  const fullScreen = (e: SyntheticEvent) => {
    e.preventDefault();
    setIsFullscreen(!isFullscreen);
  };

  if (!document.fullscreenEnabled) {
    return null;
  }

  if (isFullscreen) {
    return (
      <button
        className={`inline-block w-12`}
        title={t("exitFullscreen")}
        onClick={fullScreen}
      >
        <Shrink className={`w-full`} />
      </button>
    );
  }

  return (
    <button
      className={`inline-block w-12`}
      title={t("enterFullscreen")}
      onClick={fullScreen}
    >
      <Fullscreen className={`w-full`} />
    </button>
  );
}

export default FullscreenButton;
