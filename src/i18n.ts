import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import albums from "./locales/en/albums.json";
import common from "./locales/en/common.json";
import media from "./locales/en/media.json";
import nav from "./locales/en/nav.json";
import search from "./locales/en/search.json";

export const defaultNS = "common";

export const resources = {
  en: {
    common,
    albums,
    media,
    nav,
    search,
  },
};

i18n.use(initReactI18next).init({
  lng: "en",

  returnNull: false,
  ns: ["common", "albums", "media", "nav", "search"],
  defaultNS,
  resources,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
