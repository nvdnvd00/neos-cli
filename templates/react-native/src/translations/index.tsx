import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';

export const supportList = [
  {code: 'en-US', name: 'English', fallback: 'en'},
  {code: 'zh-CN', name: '中文', fallback: 'zh'},
  {code: 'vi-VN', name: 'Tiếng Việt', fallback: 'vi'},
  {code: 'es-ES', name: 'Español', fallback: 'es'},
  {code: 'ja-JP', name: '日本語', fallback: 'ja'},
];

let resources = {
  en: {translation: require('./en.json')},
  vi: {translation: require('./vi.json')},
  zh: {translation: require('./zh.json')},
  es: {translation: require('./es.json')},
  ja: {translation: require('./ja.json')},
};
i18next
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',
    fallbackLng: ['en', 'zh', 'vi', 'ja', 'es'],
    interpolation: {
      escapeValue: false,
    },
    keySeparator: false,
  });
export default i18next;
