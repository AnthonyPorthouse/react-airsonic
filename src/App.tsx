import React, { Suspense, useContext, useEffect, useState } from "react";
import LogIn from "./Pages/LogIn";
import {
  Routes,
  Route,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import TitleInfo from "./Components/TitleInfo";
import Spinner from "./Components/Spinner";
import { AuthContext, Authenticated, useAuth } from "./api/auth";
import { TrackListContext } from "./hooks";
import { Songs } from "./api/songs";

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
  const [auth, setAuth] = useState<Authenticated>(useContext(AuthContext));

  const [trackList, setTrackList] = useState<Songs>([]);
  const [trackListPosition, setTrackListPosition] = useState(0);
  const getCurrentTrack = () => trackList[trackListPosition];
  const nextTrack = () =>
    setTrackListPosition(
      Math.max(0, Math.min(trackList.length - 1, trackListPosition + 1))
    );

  const location = useLocation();
  const url = `${location.pathname}${location.search}`;

  const requireAuth = <RequireAuth redirectTo={url} />;

  return (
    <AuthContext.Provider value={auth}>
      <TrackListContext.Provider
        value={{
          trackList,
          setTrackList: (songs: Songs) => {
            setTrackListPosition(0);
            setTrackList(songs);
          },
          getCurrentTrack,
          nextTrack,
        }}
      >
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
                    <Route index element={<Albums />} />
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

export default App;
