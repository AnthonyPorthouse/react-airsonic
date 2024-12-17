import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
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
    <>
      <div className="absolute top-4 z-20 flex w-full justify-center">
        <a
          href="#main"
          className="sr-only rounded border bg-white px-4 py-2 text-xl shadow focus:not-sr-only"
        >
          Jump to Content
        </a>
      </div>

      <nav
        className={`z-10 flex w-full items-center justify-between bg-white px-6 py-3 text-2xl shadow md:static`}
      >
        <picture className="absolute">
          <source srcSet={logoAvif} type="image/avif" />
          <source srcSet={logoWebp} type="image/webp" />
          <source srcSet={logoPng} type="image/png" />

          <img
            src={logoAvif}
            alt={t("common:title")}
            className={`h-12 w-12 md:h-16 md:w-16`}
          />
        </picture>

        <div className={`flex w-full items-center justify-end md:hidden`}>
          <button
            onClick={toggleMenu}
            className={`my-auto h-6 w-6`}
            aria-label={t("nav:show-menu")}
          >
            <Menu />
          </button>
        </div>

        <div
          className={`absolute top-0 h-full w-screen bg-white transition-all md:static md:top-auto md:h-auto md:w-full ${
            show ? "left-0" : "-left-full"
          }`}
        >
          <div className={`px-6 py-3 md:p-0`}>
            <div className={`flex items-center justify-between md:hidden`}>
              <span className={`inline-block w-6`} />
              <picture className={`h-16 w-16`}>
                <source srcSet={logoAvif} type="image/avif" />
                <source srcSet={logoWebp} type="image/webp" />
                <source srcSet={logoPng} type="image/png" />
                <img src={logoAvif} alt={t("common:title")} />
              </picture>
              <button
                onClick={toggleMenu}
                className={`h-6 w-6`}
                aria-label={t("nav:close-menu")}
              >
                <X />
              </button>
            </div>

            <hr className={`my-3 md:hidden`} />

            <menu
              className={`flex flex-col flex-wrap gap-6 md:flex-row md:items-center md:pl-20`}
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
                  "flex w-full flex-col gap-6 md:w-auto md:flex-row md:gap-3 lg:ml-auto"
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
    </>
  );
}

export default Nav;
