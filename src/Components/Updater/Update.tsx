import { useUpdateAvailable } from "@hooks/useUpdateAvailable.js";
import { CloudUpload } from "lucide-react";
import { SyntheticEvent } from "react";
import { useTranslation } from "react-i18next";

function Update() {
  const [updateNeeded] = useUpdateAvailable();
  const { t } = useTranslation("nav");

  const refreshApplication = (e: SyntheticEvent) => {
    e.preventDefault();
    window.location.reload();
  };

  if (updateNeeded) {
    return (
      <button onClick={refreshApplication}>
        <a
          data-tooltip-id="tooltip"
          data-tooltip-content={t("update-available")}
          data-tooltip-delay-show={1000}
        >
          <CloudUpload className={`h-6`} />
        </a>
      </button>
    );
  }

  return null;
}

export default Update;
