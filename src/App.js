import LogIn from "./Pages/LogIn";
import ArtistList from "./Artists/ArtistList.jsx";
import {useSelector} from "react-redux";
import {selectSuccess} from "./features/authSlice";
import {Switch, Route, Redirect} from "react-router-dom";

function App() {
    return (
        <main className={`fixed w-screen h-screen overflow-y-auto`}>

            <Switch>
                <Route path={"/login"}>
                    <LogIn />
                </Route>

                <AuthenticatedRoute path={"/"} exact={true}>
                    <ArtistList />
                </AuthenticatedRoute>
            </Switch>
        </main>
    );
}

function AuthenticatedRoute({children, ...rest}) {
    const loginSuccessful = useSelector(selectSuccess);

    return (
        <Route {...rest} render={({location}) => {
            return loginSuccessful ? children : <Redirect
                to={{
                    pathname: "/login",
                    state: {from: location}
                }}/>
        }}/>
    );
}

export default App;
