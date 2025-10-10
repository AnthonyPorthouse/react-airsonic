import albums from "@locales/en/albums.json";
import artists from "@locales/en/artists.json";
import auth from "@locales/en/auth.json";
import common from "@locales/en/common.json";
import errors from "@locales/en/errors.json";
import media from "@locales/en/media.json";
import nav from "@locales/en/nav.json";
import playlists from "@locales/en/playlists.json";
import podcasts from "@locales/en/podcasts.json";
import search from "@locales/en/search.json";
import settings from "@locales/en/settings.json";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const defaultNS = "common";

export const resources = {
  en: {
    common,
    artists,
    albums,
    media,
    nav,
    podcasts,
    search,
    settings,
    errors,
    playlists,
    auth,
  },
};

i18n.use(initReactI18next).init({
  lng: "en",

  returnNull: false,
  ns: [
    "common",
    "artists",
    "albums",
    "media",
    "nav",
    "podcasts",
    "search",
    "settings",
    "errors",
    "playlists",
    "auth",
  ],
  defaultNS,
  resources,
  interpolation: {
    escapeValue: false,
  },
});
