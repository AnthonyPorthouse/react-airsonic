import LogIn from "./Pages/LogIn";
import { useSelector } from "react-redux";
import { selectSuccess } from "./features/authSlice";
import { Switch, Route, Redirect } from "react-router-dom";
import Artists from "./Pages/Artists";
import Artist from "./Pages/Artist";
import Albums from "./Pages/Albums";
import Nav from "./Components/Nav";
import Album from "./Pages/Album";

function App() {
  return (
    <main className={`fixed w-screen h-screen overflow-y-auto px-3 pt-3`}>
      <Nav />

      <Switch>
        <Route path={"/login"} children={<LogIn />} />
        <AuthenticatedRoute path={"/"} exact={true} children={<Albums />} />
        <AuthenticatedRoute
          path={"/artists"}
          exact={true}
          children={<Artists />}
        />
        <AuthenticatedRoute path={"/artists/:id"} children={<Artist />} />
        <AuthenticatedRoute path={"/albums/:id"} children={<Album />} />
      </Switch>
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
