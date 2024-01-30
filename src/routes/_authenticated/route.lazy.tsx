import { Outlet, createLazyFileRoute } from "@tanstack/react-router";

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
        <div className="mx-6 my-6">
          <Outlet />
        </div>
      </div>

      <MediaPlayer />
    </>
  );
}
