import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales/index';

i18next
  .use(initReactI18next)
  .init({
    resources,
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    pluralSeparator: '_',
  });

export default i18next;
