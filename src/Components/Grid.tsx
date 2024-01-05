import { ReactNode } from "react";

interface GridProps {
  className?: string;
  children: ReactNode[];
}

function Grid({ className, children }: GridProps) {
  return (
    <ul
      className={`grid ${
        className || "grid-cols-2 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8"
      } gap-6`}
    >
      {children ? children.map((child, i) => <li key={i}>{child}</li>) : null}
    </ul>
  );
}

export default Grid;
