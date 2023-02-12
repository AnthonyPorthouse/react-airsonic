import { Cog6ToothIcon, XMarkIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import { SyntheticEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactModal from "react-modal";

import { useSetting } from "../../hooks/useSettings";

function ShowSettings({ onClick }: { onClick(event?: SyntheticEvent): void }) {
  const { t } = useTranslation(["nav", "settings"]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [lastFmApiKey, setLastFmApiKey] = useSetting("lastFmApiKey");

  const openModal = () => {
    onClick()
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <a
        className={classNames("flex", "items-center", "hover:cursor-pointer")}
        title={t("nav:show-settings")}
        onClick={openModal}
      >
        <Cog6ToothIcon className={`h-6`} />
      </a>

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
          `px-4`
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
            `mb-4`
          )}
        >
          <h1 className={`text-xl`}>{t("settings:modal-title")}</h1>
          <button onClick={closeModal}>
            <XMarkIcon
              title={t("settings:close-modal")}
              className={classNames(`h-5`)}
            />
          </button>
        </header>

        <main className={classNames(`grid`, `grid-cols-[1fr_2fr]`, `gap-2`)}>
          <label className={classNames("py-2")}>LastFM API Key</label>
          <input
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
