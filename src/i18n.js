import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { reactI18nextModule } from "react-i18next";
import { en } from "./locales/en/translations.js";
import { de } from "./locales/de/translations.js";
import { toastsEN } from "./locales/en/toasts.js";
import { toastsDE } from "./locales/de/toasts.js";

const __DEV__ = process.env.NODE_ENV !== "production";

const instance = i18n
  .use(LanguageDetector)
  .use(reactI18nextModule)
  .init({
    resources: {
      en: {
        translations: {
          ...en
        },
        toasts: {
          ...toastsEN
        }
      },
      de: {
        translations: {
          ...de
        },
        toasts: {
          ...toastsDE
        }
      }
    },
    fallbackLng: "en",
    debug: __DEV__,
    ns: ["translations", "toasts"],
    defaultNS: "translations",

    // wait 	  | 'false' 	             | assert all provided namespaces are loaded before rendering
    //            |                          | the component (can be set globally too)
    // nsMode 	  | 'default' 	             | default: namespaces will be loaded an the first will be set
    //            |                          | as default or fallback: namespaces will be used as fallbacks used in order provided
    // bindI18n   | 'languageChanged loaded' | which events trigger a rerender, can be set to false or string of events
    // bindStore  | 'added removed' 	     | which events on store trigger a rerender, can be set to false or string of events
    react: {
      wait: true,
      bindI18n: "languageChanged loaded",
      bindStore: "added removed",
      nsMode: "default"
    }
  });

export default instance;
