import { ReactComponent as UpdateIcon } from "../../images/update.svg";
import { createContext, SyntheticEvent, useContext } from "react";

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
        <UpdateIcon />
      </button>
    );
  }

  return null;
}

type UpdateAvailable = boolean;

export const UpdateAvailableContext = createContext<UpdateAvailable>(false);

export function useUpdateAvailable() {
  return useContext<UpdateAvailable>(UpdateAvailableContext);
}

export default Update;
