import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import { ReactComponent as MenuIcon } from "../images/menu.svg";
import { ReactComponent as CloseIcon } from "../images/close.svg";
import { useState } from "react";

function Nav() {
  const toggleMenu = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  let [show, setShow] = useState(false);

  return (
    <nav
      className={`text-2xl px-6 py-3 bg-white w-full shadow z-50 flex justify-between md:static items-center`}
    >
      <h1 className={`md:hidden`}>Ra</h1>

      <button
        onClick={toggleMenu}
        className={`md:hidden w-6 h-6 my-auto`}
        aria-label={`Show Menu`}
      >
        <MenuIcon />
      </button>

      <div
        className={`transition-all bg-white absolute md:static top-0 md:top-auto h-full md:h-auto w-screen md:w-full ${
          show ? "left-0" : "-left-full"
        }`}
      >
        <div className={`px-6 py-3 md:p-0`}>
          <div className={`md:hidden flex items-center justify-between`}>
            <h1 className={`text-4xl`}>Ra</h1>
            <button
              onClick={toggleMenu}
              className={`w-6 h-6`}
              aria-label={`Close Menu`}
            >
              <CloseIcon />
            </button>
          </div>

          <hr className={`md:hidden my-3`} />

          <ul
            className={`flex flex-col md:flex-row gap-6 md:items-center flex-wrap `}
          >
            <li>
              <NavLink
                className={`inline-block w-full md:w-auto`}
                to={`/albums`}
              >
                Albums
              </NavLink>
            </li>
            <li>
              <NavLink
                className={`inline-block w-full md:w-auto`}
                to={`/artists`}
              >
                Artists
              </NavLink>
            </li>
            <li>
              <NavLink
                className={`inline-block w-full md:w-auto`}
                to={`/playlists`}
              >
                Playlists
              </NavLink>
            </li>
            <li className={"w-full md:w-auto md:ml-auto"}>
              <SearchBar />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
