import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/solid";
import { useFullscreen } from "@hooks/useFullscreen";
import { SyntheticEvent, memo } from "react";
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
        <ArrowsPointingInIcon className={`w-full`} />
      </button>
    );
  }

  return (
    <button
      className={`inline-block w-12`}
      title={t("enterFullscreen")}
      onClick={fullScreen}
    >
      <ArrowsPointingOutIcon className={`w-full`} />
    </button>
  );
}

export default memo(FullscreenButton);
