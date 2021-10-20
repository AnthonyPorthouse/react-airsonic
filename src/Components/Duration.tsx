import { addSeconds, lightFormat } from "date-fns";

interface DurationProps {
  time: number;
}

function Duration({ time }: DurationProps) {
  const start = new Date(0, 0, 0, 0, 0, 0, 0);
  const end = addSeconds(start, time);
  const duration = lightFormat(end, "m:ss");

  return <span>{duration}</span>;
}

export default Duration;
