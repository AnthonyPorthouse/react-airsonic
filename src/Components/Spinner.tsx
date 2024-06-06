import SpinnerIcon from "../images/spinner.svg?react";

function Spinner() {
  return (
    <div className={`flex h-full w-full items-center justify-center`}>
      <SpinnerIcon role="img" className={`w-32 stroke-current`} />
    </div>
  );
}

export default Spinner;
