import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import logo from "../images/logo192.png";
import LoggedInAs from "./Nav/LoggedInAs";
import SearchBar from "./SearchBar";
import Update from "./Updater/Update";

function Nav() {
  const { t } = useTranslation("nav");

  const toggleMenu = () => {
    setShow(!show);
  };

  let [show, setShow] = useState(false);

  return (
    <nav
      className={`text-2xl px-6 py-3 bg-white w-full shadow z-50 flex justify-between md:static items-center`}
    >
      <img
        src={logo}
        alt={t("title", { ns: "common" })}
        className={`absolute w-12 h-12 md:w-16 md:h-16`}
      />

      <div className={`md:hidden flex w-full items-center justify-end`}>
        <button
          onClick={toggleMenu}
          className={`w-6 h-6 my-auto`}
          aria-label={t("showMenu")}
        >
          <Bars3Icon />
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
            <img
              src={logo}
              alt={t("title", { ns: "common" })}
              className={`w-16 h-16`}
            />
            <button
              onClick={toggleMenu}
              className={`w-6 h-6`}
              aria-label={t("nav.closeMenu")}
            >
              <XMarkIcon />
            </button>
          </div>

          <hr className={`md:hidden my-3`} />

          <ul
            className={`flex flex-col md:pl-20 md:flex-row gap-6 md:items-center flex-wrap `}
          >
            <li>
              <NavLink
                className={`inline-block w-full md:w-auto`}
                to={`/now-playing`}
                onClick={toggleMenu}
              >
                {t("now-playing")}
              </NavLink>
            </li>
            <li>
              <NavLink
                className={`inline-block w-full md:w-auto`}
                to={`/albums`}
                onClick={toggleMenu}
              >
                {t("albums")}
              </NavLink>
            </li>

            <li>
              <NavLink
                className={`inline-block w-full md:w-auto`}
                to={`/artists`}
                onClick={toggleMenu}
              >
                {t("artists")}
              </NavLink>
            </li>
            <li>
              <NavLink
                className={`inline-block w-full md:w-auto`}
                to={`/playlists`}
                onClick={toggleMenu}
              >
                {t("playlists")}
              </NavLink>
            </li>
            <li
              className={
                "w-full md:w-auto md:ml-auto flex flex-col md:flex-row gap-6 md:gap-3"
              }
            >
              <LoggedInAs />
              <SearchBar onSubmit={toggleMenu} />
              <Update />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
