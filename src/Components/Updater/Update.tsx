import { ReactComponent as UpdateIcon } from "../../images/update.svg";
import { isUpdateAvailable } from "../../app/features/updateSlice";
import { useAppSelector } from "../../app/hooks";
import { SyntheticEvent } from "react";

function Update() {
  const updateNeeded = useAppSelector(isUpdateAvailable);

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

export default Update;
