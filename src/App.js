import LogIn from "./Pages/LogIn";
import { useSelector } from "react-redux";
import { selectSuccess } from "./features/authSlice";
import { Switch, Route, Redirect } from "react-router-dom";
import Artists from "./Pages/Artists";
import Artist from "./Pages/Artist";
import Albums from "./Pages/Albums";
import Nav from "./Components/Nav";
import Album from "./Pages/Album";
import MediaPlayer from "./Components/MediaPlayer";
import Playlists from "./Pages/Playlists";
import Playlist from "./Pages/Playlist";
import Search from "./Pages/Search";
import TitleInfo from "./Components/TitleInfo";

function App() {
  const loggedIn = useSelector(selectSuccess);

  return (
    <main className={`w-screen h-screen flex flex-col bg-gray-50`}>
      {loggedIn ? <Nav /> : null}

      <TitleInfo />

      <div className={`overflow-y-auto flex-grow`}>
        <div className="mx-6 my-6">
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
        </div>
      </div>

      {loggedIn ? <MediaPlayer /> : null}
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
