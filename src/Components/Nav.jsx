import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <ul>
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
