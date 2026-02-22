import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export const LanguageSelector = () => {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
  };

  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => handleLanguageChange('pt-BR')}
        aria-label="Português"
        title={t('language.pt')}
        className={`flex items-center gap-1 px-2 py-1 rounded text-xs md:text-sm font-medium transition-colors whitespace-nowrap ${
          i18n.language === 'pt-BR'
            ? 'bg-indigo-600 text-white'
            : 'text-gray-700 hover:bg-gray-200'
        }`}
      >
        <Globe size={16} />
        <span className="hidden md:inline">PT</span>
      </button>
      <button
        onClick={() => handleLanguageChange('en')}
        aria-label="English"
        title={t('language.en')}
        className={`flex items-center gap-1 px-2 py-1 rounded text-xs md:text-sm font-medium transition-colors whitespace-nowrap ${
          i18n.language === 'en'
            ? 'bg-indigo-600 text-white'
            : 'text-gray-700 hover:bg-gray-200'
        }`}
      >
        <Globe size={16} />
        <span className="hidden md:inline">EN</span>
      </button>
    </div>
  );
};
