import { CloudUpload } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRegisterSW } from "virtual:pwa-register/react";

function Update() {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(r) {
      console.log(`SW Registered: ${r}`);
    },
    onRegisterError(r) {
      console.log(`SW Registered: ${r}`);
    },
  });

  const { t } = useTranslation("nav");

  if (needRefresh) {
    return (
      <button onClick={() => updateServiceWorker(true)}>
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
