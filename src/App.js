import React, { Suspense } from "react";
import LogIn from "./Pages/LogIn";
import { useSelector } from "react-redux";
import { selectSuccess } from "./features/authSlice";
import { Switch, Route, Redirect } from "react-router-dom";
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
  const loggedIn = useSelector(selectSuccess);

  return (
    <main className={`w-screen h-screen flex flex-col bg-gray-50`}>
      <Suspense fallback={<div />}>{loggedIn ? <Nav /> : null}</Suspense>

      <TitleInfo />

      <div className={`overflow-y-auto flex-grow`}>
        <div className="mx-6 my-6">
          <Suspense fallback={<Spinner />}>
            <Switch>
              <Route path={"/login"}>
                <LogIn />
              </Route>
              <AuthenticatedRoute path={"/"} exact={true}>
                <Albums />
              </AuthenticatedRoute>
              <AuthenticatedRoute path={"/artists"} exact={true}>
                <Artists />
              </AuthenticatedRoute>
              <AuthenticatedRoute path={"/artists/:id"}>
                <Artist />
              </AuthenticatedRoute>
              <AuthenticatedRoute path={"/albums"} exact={true}>
                <Albums />
              </AuthenticatedRoute>
              <AuthenticatedRoute path={"/albums/:id"}>
                <Album />
              </AuthenticatedRoute>
              <AuthenticatedRoute path={"/playlists"} exact={true}>
                <Playlists />
              </AuthenticatedRoute>
              <AuthenticatedRoute path={"/playlists/:id"}>
                <Playlist />
              </AuthenticatedRoute>
              <AuthenticatedRoute path={"/search"}>
                <Search />
              </AuthenticatedRoute>
            </Switch>
          </Suspense>
        </div>
      </div>

      <Suspense fallback={<div />}>
        {loggedIn ? <MediaPlayer /> : null}
      </Suspense>
    </main>
  );
}

function AuthenticatedRoute({ children, ...rest }) {
  const loginSuccessful = useSelector(selectSuccess);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return loginSuccessful ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}

export default App;
