import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { Link } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import logoAvif from "../images/logo192.avif";
import logoPng from "../images/logo192.png";
import logoWebp from "../images/logo192.webp";
import LoggedInAs from "./Nav/LoggedInAs.js";
import SearchBar from "./SearchBar.js";
import ShowSettings from "./Settings/ShowSettings.js";
import Update from "./Updater/Update.js";

function Nav() {
  const { t } = useTranslation(["nav", "common"]);

  const [show, setShow] = useState(false);

  const toggleMenu = useCallback(() => {
    setShow(!show);
  }, [show]);

  return (
    <nav
      className={`text-2xl px-6 py-3 bg-white w-full shadow z-10 flex justify-between md:static items-center`}
    >
      <picture className="absolute">
        <source srcSet={logoAvif} type="image/avif" />
        <source srcSet={logoWebp} type="image/webp" />
        <source srcSet={logoPng} type="image/png" />

        <img
          src={logoAvif}
          alt={t("common:title")}
          className={`w-12 h-12 md:w-16 md:h-16`}
        />
      </picture>

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
            <picture className={`w-16 h-16`}>
              <source srcSet={logoAvif} type="image/avif" />
              <source srcSet={logoWebp} type="image/webp" />
              <source srcSet={logoPng} type="image/png" />
              <img src={logoAvif} alt={t("common:title")} />
            </picture>
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
              <Link
                className={`inline-block w-full md:w-auto`}
                activeProps={{
                  className: `font-bold`,
                }}
                to="/now-playing"
                onClick={toggleMenu}
              >
                {t("nav:now-playing")}
              </Link>
            </li>
            <li>
              <Link
                className={`inline-block w-full md:w-auto`}
                activeProps={{
                  className: `font-bold`,
                }}
                to="/albums"
                onClick={toggleMenu}
              >
                {t("nav:albums")}
              </Link>
            </li>

            <li>
              <Link
                className={`inline-block w-full md:w-auto`}
                activeProps={{
                  className: `font-bold`,
                }}
                to="/artists"
                onClick={toggleMenu}
              >
                {t("nav:artists")}
              </Link>
            </li>
            <li>
              <Link
                className={`inline-block w-full md:w-auto`}
                activeProps={{
                  className: `font-bold`,
                }}
                to={`/playlists`}
                onClick={toggleMenu}
              >
                {t("nav:playlists")}
              </Link>
            </li>
            <li>
              <Link
                className={`inline-block w-full md:w-auto`}
                activeProps={{
                  className: `font-bold`,
                }}
                to={`/podcasts`}
                onClick={toggleMenu}
              >
                {t("nav:podcasts")}
              </Link>
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
