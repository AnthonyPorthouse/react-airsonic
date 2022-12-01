import { CloudArrowUpIcon } from "@heroicons/react/24/solid";
import { SyntheticEvent } from "react";

import { useUpdateAvailable } from "../../hooks/useUpdateAvailable";

function Update() {
  const [updateNeeded] = useUpdateAvailable();

  const refreshApplication = (e: SyntheticEvent) => {
    e.preventDefault();
    window.location.reload();
  };

  if (updateNeeded) {
    return (
      <button
        onClick={refreshApplication}
        title="Update available. Click here to reload RA"
      >
        <CloudArrowUpIcon className={`h-6`} />
      </button>
    );
  }

  return null;
}

export default Update;
