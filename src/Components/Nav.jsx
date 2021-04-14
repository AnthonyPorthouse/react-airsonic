import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import { ReactComponent as MenuIcon } from "../images/menu.svg";
import { ReactComponent as CloseIcon } from "../images/close.svg";
import { ReactComponent as Logo } from "../images/logo.svg";
import { useState } from "react";

function Nav() {
  const toggleMenu = (e) => {
    setShow(!show);
  };

  let [show, setShow] = useState(false);

  return (
    <nav
      className={`text-2xl px-6 py-3 bg-white w-full shadow z-50 flex justify-between md:static items-center`}
    >
      <Logo className={`absolute w-12 h-12 md:w-16 md:h-16`} />

      <div className={`md:hidden flex w-full items-center justify-end`}>
        <button
          onClick={toggleMenu}
          className={`w-6 h-6 my-auto`}
          aria-label={`Show Menu`}
        >
          <MenuIcon />
        </button>
      </div>

      <div
        className={`transition-all bg-white absolute md:static top-0 md:top-auto h-full md:h-auto w-screen md:w-full ${
          show ? "left-0" : "-left-full"
        }`}
      >
        <div className={`px-6 py-3 md:p-0`}>
          <div className={`md:hidden flex items-center justify-between`}>
            <span className={`inline-block w-6`} />
            <Logo className={`w-16 h-16`} />
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
            className={`flex flex-col md:pl-20 md:flex-row gap-6 md:items-center flex-wrap `}
          >
            <li>
              <NavLink
                className={`inline-block w-full md:w-auto`}
                to={`/albums`}
                onClick={toggleMenu}
              >
                Albums
              </NavLink>
            </li>
            <li>
              <NavLink
                className={`inline-block w-full md:w-auto`}
                to={`/artists`}
                onClick={toggleMenu}
              >
                Artists
              </NavLink>
            </li>
            <li>
              <NavLink
                className={`inline-block w-full md:w-auto`}
                to={`/playlists`}
                onClick={toggleMenu}
              >
                Playlists
              </NavLink>
            </li>
            <li className={"w-full md:w-auto md:ml-auto"}>
              <SearchBar onSubmit={toggleMenu} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
