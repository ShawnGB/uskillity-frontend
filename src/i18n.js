import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { reactI18nextModule } from "react-i18next";
import { en } from "./locales/en/translations.js";
import { de } from "./locales/de/translations.js";

const instance = i18n
  .use(LanguageDetector)
  .use(reactI18nextModule)
  .init({
    resources: {
      en: {
        translations: {
          ...en
        }
      },
      de: {
        translations: {
          ...de
        }
      }
    },
    fallbackLng: "en",
    debug: true,
    // have a common namespace used around the full app
    ns: ["translations"],
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
