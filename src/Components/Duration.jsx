import { addSeconds, lightFormat } from "date-fns";

function Duration({ time }) {
  const start = new Date(0, 0, 0, 0, 0, 0, 0);
  const end = addSeconds(start, time);
  const duration = lightFormat(end, "m:ss");

  return <span>{duration}</span>;
}

export default Duration;
