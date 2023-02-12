import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import logo from "../images/logo192.png";
import LoggedInAs from "./Nav/LoggedInAs";
import SearchBar from "./SearchBar";
import ShowSettings from "./Settings/ShowSettings";
import Update from "./Updater/Update";

function Nav() {
  const { t } = useTranslation(["nav", "common"]);

  let [show, setShow] = useState(false);

  const toggleMenu = useCallback(() => {
    setShow(!show);
  }, [show]);

  return (
    <nav
      className={`text-2xl px-6 py-3 bg-white w-full shadow z-10 flex justify-between md:static items-center`}
    >
      <img
        src={logo}
        alt={t("common:title")}
        className={`absolute w-12 h-12 md:w-16 md:h-16`}
      />

      <div className={`md:hidden flex w-full items-center justify-end`}>
        <button
          onClick={toggleMenu}
          className={`w-6 h-6 my-auto`}
          aria-label={t("nav:show-menu")}
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
            <img src={logo} alt={t("common:title")} className={`w-16 h-16`} />
            <button
              onClick={toggleMenu}
              className={`w-6 h-6`}
              aria-label={t("nav:close-menu")}
            >
              <XMarkIcon />
            </button>
          </div>

          <hr className={`md:hidden my-3`} />

          <menu
            className={`flex flex-col md:pl-20 md:flex-row gap-6 md:items-center flex-wrap `}
          >
            <li>
              <NavLink
                className={`inline-block w-full md:w-auto`}
                to={`/now-playing`}
                onClick={toggleMenu}
              >
                {t("nav:now-playing")}
              </NavLink>
            </li>
            <li>
              <NavLink
                className={`inline-block w-full md:w-auto`}
                to={`/albums`}
                onClick={toggleMenu}
              >
                {t("nav:albums")}
              </NavLink>
            </li>

            <li>
              <NavLink
                className={`inline-block w-full md:w-auto`}
                to={`/artists`}
                onClick={toggleMenu}
              >
                {t("nav:artists")}
              </NavLink>
            </li>
            <li>
              <NavLink
                className={`inline-block w-full md:w-auto`}
                to={`/playlists`}
                onClick={toggleMenu}
              >
                {t("nav:playlists")}
              </NavLink>
            </li>
            <li>
              <NavLink
                className={`inline-block w-full md:w-auto`}
                to={`/podcasts`}
                onClick={toggleMenu}
              >
                {t("nav:podcasts")}
              </NavLink>
            </li>
            <li
              className={
                "w-full md:w-auto lg:ml-auto flex flex-col md:flex-row gap-6 md:gap-3"
              }
            >
              <LoggedInAs />
              <SearchBar onSubmit={toggleMenu} />
              <Update />
              <ShowSettings onClick={toggleMenu} />
            </li>
          </menu>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
