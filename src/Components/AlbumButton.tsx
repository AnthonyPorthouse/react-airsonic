import { ReactElement, ReactText, SyntheticEvent } from "react";
import classNames from "classnames";

interface PlaylistButtonProps {
  onClick(e: SyntheticEvent): void;
  children: ReactElement | ReactText;
}

function AlbumButton({ onClick, children }: PlaylistButtonProps) {
  return (
    <button
      className={classNames([
        "w-full",
        "px-2",
        "py-1",
        "rounded-md",
        "bg-black",
        "text-white",
      ])}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default AlbumButton;
