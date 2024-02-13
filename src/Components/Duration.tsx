import { Temporal } from "temporal-polyfill";

interface DurationProps {
  time: number;
}

function to2Digits(number: number) {
  return String(number).padStart(2, "0");
}

function Duration({ time }: Readonly<DurationProps>) {
  const duration = Temporal.Duration.from({
    milliseconds: Math.floor(time * 1000),
  }).round({ largestUnit: "hour" });

  const output =
    `${to2Digits(duration.hours)}:${to2Digits(duration.minutes)}:${to2Digits(duration.seconds)}`.replace(
      "00:",
      "",
    );

  return <span>{output}</span>;
}

export default Duration;
