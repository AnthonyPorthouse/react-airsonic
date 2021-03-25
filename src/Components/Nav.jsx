import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";

function Nav() {
  return (
    <nav className={`text-2xl px-6 py-3 bg-white w-full shadow z-50`}>
      <ul className={`flex gap-6 items-center flex-wrap`}>
        <li>
          <NavLink to={`/albums`}>Albums</NavLink>
        </li>
        <li>
          <NavLink to={`/artists`}>Artists</NavLink>
        </li>
        <li>
          <NavLink to={`/playlists`}>Playlists</NavLink>
        </li>
        <li className={"w-full md:w-auto md:ml-auto"}>
          <SearchBar />
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
