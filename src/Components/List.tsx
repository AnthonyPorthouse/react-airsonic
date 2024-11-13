import { PropsWithChildren, Suspense, lazy } from "react";

const Grid = lazy(() => import("./Grid.js"));

function List({
  className,
  children,
}: Readonly<
  PropsWithChildren<{
    className?: string;
  }>
>) {
  return (
    <Suspense fallback={null}>
      <Grid className={className}>{children}</Grid>
    </Suspense>
  );
}

export default List;
