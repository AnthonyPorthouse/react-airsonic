import { Outlet, createLazyFileRoute } from "@tanstack/react-router";
import { createPortal } from "react-dom";
import { Tooltip } from "react-tooltip";

import MediaPlayer from "../../Components/MediaPlayer";
import Nav from "../../Components/Nav";
import Spinner from "../../Components/Spinner";

export const Route = createLazyFileRoute("/_authenticated")({
  component: Authenticated,
  pendingComponent: Spinner,
});

function Authenticated() {
  return (
    <>
      <Nav />

      <div className={`overflow-y-auto flex-grow`}>
        <div className="p-6 h-full">
          <Outlet />
        </div>
      </div>

      <MediaPlayer />

      {createPortal(
        <Tooltip id="tooltip" style={{ zIndex: 100 }} />,
        document.body,
      )}
    </>
  );
}
