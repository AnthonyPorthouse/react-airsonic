import { CloudArrowUpIcon } from "@heroicons/react/24/solid";
import { SyntheticEvent } from "react";

import { useTranslation } from "react-i18next";
import { useUpdateAvailable } from "../../hooks/useUpdateAvailable.js";

function Update() {
  const [updateNeeded] = useUpdateAvailable();
  const { t } = useTranslation("nav");


  const refreshApplication = (e: SyntheticEvent) => {
    e.preventDefault();
    window.location.reload();
  };

  if (updateNeeded) {
    return (
      <button
        onClick={refreshApplication}
      >
        <a data-tooltip-id="tooltip" data-tooltip-content={t('update-available')}>
          <CloudArrowUpIcon className={`h-6`} />
        </a>
      </button>
    );
  }

  return null;
}

export default Update;
