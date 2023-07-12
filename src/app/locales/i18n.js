import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "../locales/en.json";
import translationTR from "../locales/tr.json";
import translationAZ from "../locales/az.json";
import translationRU from "../locales/ru.json";

const resources = {
  en: {
    translation: translationEN,
  },
  tr: {
    translation: translationTR,
  },
  az: {
    translation: translationAZ,
  },
  ru: {
    translation: translationRU,
  },
};

const userLanguages =
  window?.navigator.userLanguage || window?.navigator.language;

i18n.use(initReactI18next).init({
  resources,
  lng: `${userLanguages.slice(0, 2)}`,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
