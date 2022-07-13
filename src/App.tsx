import React, { Suspense } from "react";
import LogIn from "./Pages/LogIn";
import { useAppSelector } from "./app/hooks";
import { selectSuccess } from "./app/features/authSlice";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import TitleInfo from "./Components/TitleInfo";
import Spinner from "./Components/Spinner";

const Artists = React.lazy(() => import("./Pages/Artists"));
const Artist = React.lazy(() => import("./Pages/Artist"));
const Albums = React.lazy(() => import("./Pages/Albums"));
const Album = React.lazy(() => import("./Pages/Album"));
const Playlists = React.lazy(() => import("./Pages/Playlists"));
const Playlist = React.lazy(() => import("./Pages/Playlist"));
const Search = React.lazy(() => import("./Pages/Search"));

const Nav = React.lazy(() => import("./Components/Nav"));
const MediaPlayer = React.lazy(() => import("./Components/MediaPlayer"));

function App() {
  const loggedIn = useAppSelector(selectSuccess);

  return (
    <main className={`w-screen h-screen flex flex-col bg-gray-50`}>
      <Suspense fallback={null}>{loggedIn ? <Nav /> : null}</Suspense>

      <TitleInfo />

      <div className={`overflow-y-auto flex-grow`}>
        <div className="mx-6 my-6">
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path={"/login"} element={<LogIn />} />

              <Route path={"/"} element={<RequireAuth redirectTo="/login" />}>
                <Route index element={<Albums />} />
              </Route>

              <Route
                path={"/artists"}
                element={<RequireAuth redirectTo="/login" />}
              >
                <Route index element={<Artists />} />
                <Route path=":id" element={<Artist />} />
              </Route>

              <Route path={"/albums"}>
                <Route index element={<Albums />} />
                <Route path={":id"} element={<Album />} />
              </Route>

              <Route path={"/playlists"}>
                <Route index element={<Playlists />} />
                <Route path={":id"} element={<Playlist />} />
              </Route>

              <Route path={"/search/*"} element={<Search />} />
            </Routes>
          </Suspense>
        </div>
      </div>

      <Suspense fallback={null}>{loggedIn ? <MediaPlayer /> : null}</Suspense>
    </main>
  );
}

function RequireAuth({ redirectTo }: { redirectTo: string }) {
  const loginSuccessful = useAppSelector(selectSuccess);

  return loginSuccessful ? <Outlet /> : <Navigate to={redirectTo} />;
}

export default App;
