import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import albums from "./locales/en/albums.json";
import common from "./locales/en/common.json";
import media from "./locales/en/media.json";
import nav from "./locales/en/nav.json";
import podcasts from "./locales/en/podcasts.json";
import search from "./locales/en/search.json";
import settings from "./locales/en/settings.json";

export const defaultNS = "common";

export const resources = {
  en: {
    common,
    albums,
    media,
    nav,
    podcasts,
    search,
    settings,
  },
};

i18n.use(initReactI18next).init({
  lng: "en",

  returnNull: false,
  ns: ["common", "albums", "media", "nav", "podcasts", "search", "settings"],
  defaultNS,
  resources,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
