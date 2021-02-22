import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className={`text-2xl px-6 py-3 bg-white w-full shadow`}>
      <ul className={`flex gap-x-6`}>
        <li>
          <NavLink to={`/albums`}>Albums</NavLink>
        </li>
        <li>
          <NavLink to={`/artists`}>Artists</NavLink>
        </li>
        <li>
          <NavLink to={`/playlists`}>Playlists</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
