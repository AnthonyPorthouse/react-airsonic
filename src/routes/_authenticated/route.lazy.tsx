import { FullscreenProvider } from "@/Providers/FullscreenProvider";
import MediaPlayer from "@components/MediaPlayer";
import Nav from "@components/Nav";
import Spinner from "@components/Spinner";
import { Outlet, createLazyFileRoute } from "@tanstack/react-router";
import { createPortal } from "react-dom";
import { Tooltip } from "react-tooltip";

export const Route = createLazyFileRoute("/_authenticated")({
  component: Authenticated,
  pendingComponent: Spinner,
});

function Authenticated() {
  return (
    <FullscreenProvider>
      <Nav />

      <div className={`flex-grow overflow-y-auto`}>
        <div className="max-h-full p-6">
          <a id="main" />
          <Outlet />
        </div>
      </div>

      <MediaPlayer />

      {createPortal(
        <Tooltip id="tooltip" style={{ zIndex: 100 }} />,
        document.body,
      )}
    </FullscreenProvider>
  );
}
