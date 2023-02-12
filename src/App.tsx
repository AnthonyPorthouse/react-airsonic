import React, {
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Outlet,
  Route,
  Routes,
  redirect,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Spinner from "./Components/Spinner";
import TitleInfo from "./Components/TitleInfo";
import LogIn from "./Pages/LogIn";
import NowPlaying from "./Pages/NowPlaying";
import { AuthContext, Authenticated, useAuth } from "./api/auth";
import { Songs } from "./api/songs";
import { TrackListContext } from "./hooks";

const Artists = React.lazy(() => import("./Pages/Artists"));
const Artist = React.lazy(() => import("./Pages/Artist"));
const Albums = React.lazy(() => import("./Pages/Albums"));
const Album = React.lazy(() => import("./Pages/Album"));
const Playlists = React.lazy(() => import("./Pages/Playlists"));
const Playlist = React.lazy(() => import("./Pages/Playlist"));
const Search = React.lazy(() => import("./Pages/Search"));
const Podcasts = React.lazy(() => import("./Pages/Podcasts"));
const Podcast = React.lazy(() => import("./Pages/Podcast"));

const Nav = React.lazy(() => import("./Components/Nav"));
const MediaPlayer = React.lazy(() => import("./Components/MediaPlayer"));

function App() {
  const [auth, setAuth] = useState<Authenticated>(useContext(AuthContext));

  const logout = useCallback(() => {
    redirect("/login");

    localStorage.setItem("ra.password", "");

    setAuth(
      Object.assign({}, auth, {
        isAuthenticated: false,
        credentials: {
          username: auth.credentials.username,
          password: "",
          server: auth.credentials.server,
        },
      })
    );
  }, [auth]);

  const [trackList, setTrackList] = useState<Songs>([]);
  const [trackListPosition, setTrackListPosition] = useState(0);

  const location = useLocation();
  const url = `${location.pathname}${location.search}`;

  const requireAuth = <RequireAuth redirectTo={url} />;

  const authValue = useMemo(() => ({ ...auth, logout }), [auth, logout]);

  const trackListValue = {
    trackList,
    setTrackList: (songs: Songs) => {
      setTrackListPosition(0);
      setTrackList(songs);
    },
    getCurrentTrack: useCallback(
      () => trackList[trackListPosition],
      [trackList, trackListPosition]
    ),
    nextTrack: useCallback(
      () =>
        setTrackListPosition(
          Math.max(0, Math.min(trackList.length - 1, trackListPosition + 1))
        ),
      [trackList, trackListPosition]
    ),
  };

  return (
    <AuthContext.Provider value={authValue}>
      <TrackListContext.Provider value={trackListValue}>
        <main className={`w-screen h-screen flex flex-col bg-gray-50`}>
          <Suspense fallback={null}>
            {auth.isAuthenticated ? <Nav /> : null}
          </Suspense>

          <TitleInfo />

          <div className={`overflow-y-auto flex-grow`}>
            <div className="mx-6 my-6">
              <Suspense fallback={<Spinner />}>
                <Routes>
                  <Route
                    path={"/login"}
                    element={<LogIn setAuth={setAuth} />}
                  />

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
            {auth.isAuthenticated ? <MediaPlayer /> : null}
          </Suspense>
        </main>
      </TrackListContext.Provider>
    </AuthContext.Provider>
  );
}

function RequireAuth({ redirectTo }: { redirectTo: string }) {
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
