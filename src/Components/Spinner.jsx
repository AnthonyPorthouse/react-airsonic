import { ReactComponent as SpinnerIcon } from "../images/spinner.svg";

function Spinner() {
  return (
    <div className={`w-full h-full flex items-center justify-center`}>
      <SpinnerIcon alt={`Loading`} className={`w-32 stroke-current`} />
    </div>
  );
}

export default Spinner;
