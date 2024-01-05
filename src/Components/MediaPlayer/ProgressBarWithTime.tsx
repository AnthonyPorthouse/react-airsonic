import classNames from "classnames";

import Duration from "../Duration.js";
import ProgressBar from "./ProgressBar.js";

export function ProgressBarWithTime({
  length,
  position,
  className,
}: Readonly<{
  length: number;
  position: number;
  className?: string;
}>) {
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
