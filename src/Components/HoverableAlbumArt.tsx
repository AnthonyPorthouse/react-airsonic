import { ReactNode } from "react";

import AlbumArt from "./AlbumArt.js";

/**
 * Artwork that visually rises when you hover over it
 */
function HoverableAlbumArt({
  children,
  coverArt,
  artDescription,
  lazyLoad = false,
}: {
  readonly children: ReactNode;
  readonly coverArt?: string;
  readonly artDescription: string;
  readonly lazyLoad?: boolean;
}) {
  return (
    <div className={`group relative block w-full focus:ring-0`}>
      <div className="overflow-hidden rounded transition group-hover:-translate-y-2 group-hover:shadow-lg group-focus:-translate-y-2 group-focus:shadow-lg group-focus:ring-inset">
        <AlbumArt
          id={coverArt}
          description={artDescription}
          lazyLoad={lazyLoad}
        />
        <div
          className={`absolute left-0 top-0 flex h-full w-full flex-col justify-center bg-white/75 p-1 text-center opacity-0 transition-all duration-200 ease-in-out group-hover:opacity-100 group-focus:opacity-100`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default HoverableAlbumArt;
