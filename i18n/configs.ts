import i18next from "i18next";
import { initReactI18next } from "react-i18next";

// 言語jsonファイルのimport
import translation_en from "./en.json";
import translation_ja from "./ja.json";

const resources = {
  ja: {
    translation: translation_ja,
  },
  en: {
    translation: translation_en,
  },
};

let defaultLanguage = "en";

if (typeof window !== "undefined") {
  defaultLanguage = window.navigator.language || "en";
}

i18next.use(initReactI18next).init({
  resources,
  lng: defaultLanguage,
  preload: [defaultLanguage],
  interpolation: { escapeValue: false },
});

export default i18next;
