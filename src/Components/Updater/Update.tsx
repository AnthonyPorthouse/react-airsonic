import { CloudArrowUpIcon } from "@heroicons/react/24/solid";
import { SyntheticEvent, createContext, useContext } from "react";

function Update() {
  const updateNeeded = useUpdateAvailable();

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
        <CloudArrowUpIcon />
      </button>
    );
  }

  return null;
}

type UpdateAvailable = boolean;

export const UpdateAvailableContext = createContext<UpdateAvailable>(false);
UpdateAvailableContext.displayName = "UpdateAvailable";

export function useUpdateAvailable() {
  return useContext<UpdateAvailable>(UpdateAvailableContext);
}

export default Update;
