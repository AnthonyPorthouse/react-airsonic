interface DurationProps {
  time: number;
}

const minute = 60;
const hour = minute * 60;

function Duration({ time }: Readonly<DurationProps>) {
  let duration = `${Math.floor((time % hour) / minute)
    .toString()
    .padStart(2, "0")}:${Math.floor(time % minute)
    .toString()
    .padStart(2, "0")}`;

  if (time > hour) {
    duration = `${Math.floor(time / hour)}:${duration}`;
  }

  return <span>{duration}</span>;
}

export default Duration;
