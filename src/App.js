import LogIn from "./Pages/LogIn";
import {useSelector} from "react-redux";
import {selectSuccess} from "./features/authSlice";
import {Switch, Route, Redirect} from "react-router-dom";
import Artists from "./Pages/Artists";
import Artist from "./Pages/Artist";

function App() {
    return (
        <main className={`fixed w-screen h-screen overflow-y-auto`}>

            <Switch>
                <Route path={"/login"}>
                    <LogIn />
                </Route>

                <AuthenticatedRoute path={"/"} exact={true}>
                    <Artists />
                </AuthenticatedRoute>

                <AuthenticatedRoute path={"/artist/:id"} children={<Artist/>} />
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
