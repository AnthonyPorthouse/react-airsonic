import { ReactComponent as UpdateIcon } from "../../images/update.svg";
import { SyntheticEvent } from "react";

function Update() {
  const updateNeeded = false;

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
