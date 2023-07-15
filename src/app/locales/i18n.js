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

let userLang;
let userLanguage =
  typeof window !== "undefined"
    ? window.navigator.userLanguage || window.navigator.language
    : null;

typeof window !== "undefined"
  ? localStorage.setItem("defaultLang", userLanguage.slice(0, 2))
  : null;

localStorage.getItem("lang")
  ? (userLang = localStorage.getItem("lang"))
  : (userLang = userLanguage?.slice(0, 2));

// userLanguage ? (userLang = userLanguage?.slice(0, 2)) : null;

i18n.use(initReactI18next).init({
  resources,
  lng: `${userLang}`,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
