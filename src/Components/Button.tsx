import classNames from "classnames";
import { ButtonHTMLAttributes, PropsWithChildren, ReactElement } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** A function that returns a React component to use as an icon */
  readonly renderIcon?: () => ReactElement;
}

function Button({
  children,
  className,
  renderIcon,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <button className={classNames(`group relative focus:ring-0`)} {...props}>
      <div
        className={classNames(
          `transition group-hover:-translate-y-1 group-focus:-translate-y-1`,
          `flex w-full flex-row items-center rounded-full border border-gray-200 bg-white px-2 py-1 text-lg shadow-sm group-hover:shadow-md group-focus:shadow-md group-active:shadow-inner`,
          className,
        )}
      >
        {renderIcon?.()}
        {children}
      </div>
    </button>
  );
}

export default Button;
