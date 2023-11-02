import SpinnerIcon from "../images/spinner.svg?react";

function Spinner() {
  return (
    <div className={`w-full h-full flex items-center justify-center`}>
      <SpinnerIcon className={`w-32 stroke-current`} />
    </div>
  );
}

export default Spinner;
