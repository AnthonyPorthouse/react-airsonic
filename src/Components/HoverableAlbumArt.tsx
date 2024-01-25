import { ReactNode } from "react";
import AlbumArt from "./AlbumArt.js";

function HoverableAlbumArt({children, coverArt, artDescription, lazyLoad = false}: Readonly<{children: ReactNode, coverArt?: string, artDescription: string, lazyLoad?: boolean}>) {

    return <div
      className={`group block w-full relative focus:ring-0`}
    >
      <div className="group-focus:-translate-y-2 group-hover:-translate-y-2 group-focus:shadow-lg group-hover:shadow-lg overflow-hidden rounded transition group-focus:ring-inset">
        <AlbumArt id={coverArt} description={artDescription} lazyLoad={lazyLoad} />
        <div
          className={`absolute top-0 left-0 w-full h-full transition-all duration-200 ease-in-out bg-white/75 opacity-0 group-hover:opacity-100 group-focus:opacity-100 p-1 flex flex-col justify-center text-center`}
        >
          { children }
        </div>
      </div>
    </div>
}

export default HoverableAlbumArt