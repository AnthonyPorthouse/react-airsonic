import classNames from "classnames";
import { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  renderIcon?: () => ReactElement;
}

function Button({
  children,
  className,
  renderIcon,
  ...props
}: Readonly<Props>) {
  return (
    <button
      className={classNames(
        `flex w-full flex-row items-center rounded-full border border-gray-200 bg-white px-2 py-1 text-lg shadow-sm hover:shadow-md focus:shadow-md active:shadow-inner`,
        className,
      )}
      {...props}
    >
      {renderIcon && renderIcon()}
      {children}
    </button>
  );
}

export default Button;
