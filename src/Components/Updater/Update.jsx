import UpdateContext from "./UpdateContext";
import { useContext } from "react";

import { ReactComponent as UpdateIcon } from "../../images/update.svg";

function Update() {
  const updateNeeded = useContext(UpdateContext);

  const refreshApplication = (e) => {
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
