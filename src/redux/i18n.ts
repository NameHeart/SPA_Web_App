// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from '../locales/en.json';
import thTranslation from '../locales/th.json';

const resources = {
  en: {
    translation: enTranslation.translation,
  },
  th: {
    translation: thTranslation.translation,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'th',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
