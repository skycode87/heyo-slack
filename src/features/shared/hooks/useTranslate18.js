import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

const useTranslate18 = (language = "en") => {
  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources: {
        en: {
          translation: {
            "Welcome to React": "Welcome to React and react-i18next",
          },
        },
        es: {
          translation: {
            "Welcome to React": "Bienvenido a React",
          },
        },
      },
      lng: "en",
      fallbackLng: "en",

      interpolation: {
        escapeValue: false,
      },
    });

  i18n.changeLanguage(language);

  // const { t } = useTranslation();

  const usuario = {
    name: "pedro",
  };

  return { usuario };
};

export default useTranslate18;
