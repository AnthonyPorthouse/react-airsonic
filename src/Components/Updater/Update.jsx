import { ReactComponent as UpdateIcon } from "../../images/update.svg";
import { isUpdateAvailable } from "../../features/updateSlice";
import { useSelector } from "react-redux";

function Update() {
  const updateNeeded = useSelector(isUpdateAvailable);

  const refreshApplication = (e) => {
    e.preventDefault();
    window.location.reload(true);
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
