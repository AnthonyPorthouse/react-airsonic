import { memo } from "react";
import { Temporal } from "temporal-polyfill";

interface DurationProps {
  readonly time: number;
}

function to2Digits(number: number) {
  return String(number).padStart(2, "0");
}

function Duration({ time }: DurationProps) {
  if (isNaN(time) || !isFinite(time)) {
    time = 0;
  }

  const duration = Temporal.Duration.from({
    milliseconds: Math.floor(time * 1000),
  }).round({ largestUnit: "hour" });

  const output =
    `${to2Digits(duration.hours)}:${to2Digits(duration.minutes)}:${to2Digits(duration.seconds)}`.replace(
      /^00:/,
      "",
    );

  return <span className="tabular-nums">{output}</span>;
}

export default memo(Duration);
