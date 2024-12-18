import { useSetting } from "@hooks/useSettings.js";
import classNames from "classnames";
import { Settings, X } from "lucide-react";
import { SyntheticEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactModal from "react-modal";

type ShowSettingsProps = { onClick(event?: SyntheticEvent): void };

function ShowSettings({ onClick }: Readonly<ShowSettingsProps>) {
  const { t } = useTranslation(["nav", "settings"]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [lastFmApiKey, setLastFmApiKey] = useSetting("lastFmApiKey");

  const openModal = () => {
    onClick();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        className={classNames("flex", "items-center", "hover:cursor-pointer")}
        title={t("nav:show-settings")}
        onClick={openModal}
      >
        <Settings className={`h-6`} />
      </button>

      <ReactModal
        className={classNames(
          `fixed`,
          `left-0`,
          `md:left-1/4`,
          `right-0`,
          `md:right-1/4`,
          `top-12`,
          `md:top-1/4`,
          `bottom-0`,
          `md:bottom-1/4`,
          `bg-white`,
          `p-2`,
          `px-4`,
          "shadow-lg",
        )}
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
        contentLabel={t("settings:modal-title")}
      >
        <header
          className={classNames(
            `w-full`,
            `flex`,
            `flex-row`,
            `justify-between`,
            `mb-4`,
          )}
        >
          <h1 className={`text-xl`}>{t("settings:modal-title")}</h1>
          <button onClick={closeModal} title={t("settings:close-modal")}>
            <X className={classNames(`h-5`)} />
          </button>
        </header>

        <main className={classNames(`grid`, `grid-cols-[1fr_2fr]`, `gap-2`)}>
          <label htmlFor="last-fm-setting" className={classNames("py-2")}>
            LastFM API Key
          </label>
          <input
            id="last-fm-setting"
            className={classNames(`border-0 border-b px-1`)}
            type="text"
            value={lastFmApiKey}
            onChange={(e) => setLastFmApiKey(e.target.value)}
          />
        </main>
      </ReactModal>
    </>
  );
}

export default ShowSettings;
