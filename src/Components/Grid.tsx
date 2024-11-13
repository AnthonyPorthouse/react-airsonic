import { Children, PropsWithChildren } from "react";

function Grid({
  className,
  children,
}: Readonly<PropsWithChildren<{ className?: string }>>) {
  return (
    <ul
      className={`grid ${
        className ?? "grid-cols-2 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8"
      } gap-6`}
    >
      {children ? Children.map(children, (child) => <li>{child}</li>) : null}
    </ul>
  );
}

export default Grid;
