import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ptBR } from './locales/pt-BR';
import { en } from './locales/en';

const resources = {
  'pt-BR': {
    translation: ptBR,
  },
  en: {
    translation: en,
  },
};

const savedLanguage = localStorage.getItem('language') || 'pt-BR';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'pt-BR',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
