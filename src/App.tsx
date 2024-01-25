import React, { Suspense, useEffect } from "react";
import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Spinner from "./Components/Spinner.js";
import TitleInfo from "./Components/TitleInfo.js";
import LogIn from "./Pages/LogIn.js";
import NowPlaying from "./Pages/NowPlaying.js";
import { useAuth } from "./Providers/AuthProvider.js";
import { TrackListProvider } from "./Providers/TrackListProvider.js";

const Artists = React.lazy(() => import("./Pages/Artists.js"));
const Artist = React.lazy(() => import("./Pages/Artist.js"));
const Albums = React.lazy(() => import("./Pages/Albums.js"));
const Album = React.lazy(() => import("./Pages/Album.js"));
const Playlists = React.lazy(() => import("./Pages/Playlists.js"));
const Playlist = React.lazy(() => import("./Pages/Playlist.js"));
const Search = React.lazy(() => import("./Pages/Search.js"));
const Podcasts = React.lazy(() => import("./Pages/Podcasts.js"));
const Podcast = React.lazy(() => import("./Pages/Podcast.js"));

const Nav = React.lazy(() => import("./Components/Nav.js"));
const MediaPlayer = React.lazy(() => import("./Components/MediaPlayer.js"));

function App() {
  const { isAuthenticated } = useAuth();

  const location = useLocation();
  const url = `${location.pathname}${location.search}`;

  const requireAuth = <RequireAuth redirectTo={url} />;

  return (
    <TrackListProvider>
      <main className={`w-screen h-screen flex flex-col bg-gray-50 font-work-sans`}>
        <Suspense fallback={null}>{isAuthenticated ? <Nav /> : null}</Suspense>

        <TitleInfo />

        <div className={`overflow-y-auto flex-grow`}>
          <div className="mx-6 my-6">
            <Suspense fallback={<Spinner />}>
              <Routes>
                <Route path={"/login"} element={<LogIn />} />

                <Route path={"/"} element={requireAuth}>
                  <Route index element={<HomepageRedirect />} />
                </Route>

                <Route path={"/now-playing"} element={requireAuth}>
                  <Route index element={<NowPlaying />} />
                </Route>

                <Route path={"/artists"} element={requireAuth}>
                  <Route index element={<Artists />} />
                  <Route path=":id" element={<Artist />} />
                </Route>

                <Route path={"/albums"} element={requireAuth}>
                  <Route index element={<Albums />} />
                  <Route path={":id"} element={<Album />} />
                </Route>

                <Route path={"/playlists"} element={requireAuth}>
                  <Route index element={<Playlists />} />
                  <Route path={":id"} element={<Playlist />} />
                </Route>

                <Route path={"/podcasts"} element={requireAuth}>
                  <Route index element={<Podcasts />} />
                  <Route path={":id"} element={<Podcast />} />
                </Route>

                <Route path={"/search/*"} element={requireAuth}>
                  <Route index element={<Search />} />
                </Route>
              </Routes>
            </Suspense>
          </div>
        </div>

        <Suspense fallback={null}>
          {isAuthenticated ? <MediaPlayer /> : null}
        </Suspense>
      </main>
    </TrackListProvider>
  );
}

function RequireAuth({ redirectTo }: Readonly<{ redirectTo: string }>) {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated } = auth;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: {
          from: redirectTo,
        },
      });
    }
  }, [isAuthenticated, location.pathname, navigate, redirectTo]);

  return <Outlet />;
}

function HomepageRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/albums");
  });

  return null;
}

export default App;
