import type { I18nConfig } from 'next-i18next/proxy'

const i18nConfig: I18nConfig = {
  supportedLngs: ['en', 'ua'],
  fallbackLng: 'ua',
  defaultNS: 'common',
  localeInPath: false,
  ns: ['home', 'market', "event-board"],
  resourceLoader: (language, namespace) =>
    import(`./app/locales/${language}/${namespace}.json`),
}

export default i18nConfig