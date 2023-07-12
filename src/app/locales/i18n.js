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
let userLanguage = window?.navigator.userLanguage || window?.navigator.language;

userLanguage ? (userLang = userLanguage?.slice(0, 2)) : null;

console.log(userLang);

i18n.use(initReactI18next).init({
  resources,
  lng: `${userLang}`,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;