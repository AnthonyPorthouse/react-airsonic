import { getScaledCoverArtUrl } from "@api/artwork.js";
import { useAuth } from "@hooks/useAuth";
import classNames from "classnames";
import md5 from "md5";
import { useEffect, useMemo, useRef, useState } from "react";

export interface AlbumArtProps {
  /**
   * The ID of the Album Artwork to fetch the information for
   */
  readonly id?: string;

  /**
   * The description of the Album Artwork
   */
  readonly description?: string;

  /**
   * A custom sizes parameter for our image
   */
  readonly sizes?: string;
  readonly lazyLoad?: boolean;
  readonly className?: string;
}

/**
 * Displays the album art of an album, or displays a random colour if no artwork ID is found
 */
function AlbumArt({
  id,
  description,
  sizes,
  lazyLoad,
  className,
}: AlbumArtProps) {
  const auth = useAuth();
  const el = useRef<HTMLImageElement>(null);

  const [width, setWidth] = useState<number>(1);

  const hash = useMemo(() => {
    return md5(description ?? "").slice(0, 6);
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
        className={classNames(
          `aspect-square max-w-full overflow-hidden rounded`,
          className,
        )}
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
      aria-hidden="true"
      className={classNames(`w-full overflow-hidden rounded`, className)}
      srcSet={dimensions}
      sizes={
        sizes ??
        `(min-width: 1024px) 16vw,
        (min-width: 768px) and (max-width: 1024px) 25vw,
        50vw`
      }
      loading={lazyLoad ? "lazy" : "eager"}
    />
  );
}

export default AlbumArt;
