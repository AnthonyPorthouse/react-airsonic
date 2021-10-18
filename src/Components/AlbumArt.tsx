import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../features/authSlice";
import { getScaledCoverArtUrl } from "../features/api";

interface AlbumArtProps {
  id: string;
  description: string;
  sizes?: string;
}

function AlbumArt({ id, description, sizes }: AlbumArtProps) {
  const auth = useSelector(selectAuth);
  const el = useRef<HTMLImageElement>(null);

  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    setWidth(el.current ? el.current.offsetWidth : 0);
  }, []);

  const dimensions = (() => {
    const modifier = 32;
    const min = 32;
    const max = 1024;
    const values = [];

    for (let i = min; i <= max; i += modifier) {
      values.push(
        `${getScaledCoverArtUrl({ id, size: String(i), ...auth })} ${i}w`
      );
    }

    return values.join(", ");
  })();

  return (
    <img
      ref={el}
      width={width}
      height={width}
      alt={description}
      className={`rounded overflow-hidden w-full`}
      srcSet={dimensions}
      sizes={
        sizes ||
        `(min-width: 1024px) 16vw,
        (min-width: 768px) and (max-width: 1024px) 25vw,
        50vw`
      }
      loading="lazy"
    />
  );
}

export default AlbumArt;
