import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav
      className={`text-2xl mb-6 px-6 py-3 fixed top-0 bg-white w-full shadow`}
    >
      <ul className={`flex gap-x-6`}>
        <li>
          <NavLink to={`/`}>Home</NavLink>
        </li>
        <li>
          <NavLink to={`/albums`}>All Albums</NavLink>
        </li>
        <li>
          <NavLink to={`/artists`}>All Artists</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
