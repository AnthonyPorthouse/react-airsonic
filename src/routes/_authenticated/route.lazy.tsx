import { Outlet, createLazyFileRoute } from "@tanstack/react-router";
import MediaPlayer from "../../Components/MediaPlayer";
import Nav from "../../Components/Nav";

export const Route = createLazyFileRoute("/_authenticated")({
    component: Authenticated
});

function Authenticated() {
    return (<>
        <Nav />

        <div className={`overflow-y-auto flex-grow`}>
            <div className="mx-6 my-6">
                <Outlet />
            </div>
        </div>

        <MediaPlayer />

    </>)
}
