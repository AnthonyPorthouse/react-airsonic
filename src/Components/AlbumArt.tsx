import md5 from "md5";
import { useEffect, useMemo, useRef, useState } from "react";

import { useAuth } from "../Providers/AuthProvider.js";
import { getScaledCoverArtUrl } from "../api/artwork.js";

interface AlbumArtProps {
  id?: string;
  description?: string;
  sizes?: string;
  lazyLoad?: boolean;
}

function AlbumArt({ id, description, sizes, lazyLoad }: Readonly<AlbumArtProps>) {
  const auth = useAuth();
  const el = useRef<HTMLImageElement>(null);

  const [width, setWidth] = useState<number>(1);

  const hash = useMemo(() => {
    return md5(description || "").slice(0, 6);
  }, [description]);

  useEffect(() => {
    setWidth(el.current ? el.current.offsetWidth : 0);
  }, []);

  if (!id) {
    return (
      <div
        ref={el}
        style={{
          width: `100%`,
          backgroundColor: `#${hash}`,
        }}
        className={`rounded overflow-hidden max-w-full aspect-square`}
      />
    );
  }

  const dimensions = (() => {
    const modifier = 32;
    const min = 32;
    const max = 1024;
    const values = [];

    for (let i = min; i <= max; i += modifier) {
      values.push(
        `${getScaledCoverArtUrl(id, String(i), auth.credentials)} ${i}w`,
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
      loading={lazyLoad ? "lazy" : "eager"}
    />
  );
}

export default AlbumArt;
