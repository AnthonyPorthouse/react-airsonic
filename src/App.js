import LogIn from "./LogIn";
import ArtistList from "./Artists/ArtistList.jsx";
import {useSelector} from "react-redux";
import {selectSuccess} from "./features/authSlice";

function App() {
    const loginSuccessful = useSelector(selectSuccess)

    return (
        <main className={`fixed w-screen h-screen overflow-y-auto`}>
            {loginSuccessful ? <ArtistList /> : <LogIn/>}
        </main>
    );
}

export default App;
