import ProgressBar from "./ProgressBar";
import Duration from "../Duration";
import classNames from "classnames";

export function ProgressBarWithTime({
  length,
  position,
  className,
}: {
  length: number;
  position: number;
  className?: string;
}) {
  return (
    <div className={classNames(`w-full flex flex-col`, className)}>
      <ProgressBar length={length} position={position} />
      <div className={`flex justify-between`}>
        <Duration time={position} />
        <Duration time={length} />
      </div>
    </div>
  );
}
