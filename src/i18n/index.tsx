import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { dict as baseDict } from './dictionary';
import { extraDict } from './dictionary.extra';
import { festiveDict } from './dictionary.festive';

const dict: Record<string, { kk: string; ru: string }> = { ...baseDict, ...extraDict, ...festiveDict };

export type Lang = 'kk' | 'ru' | 'en';
type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (s: string) => string };

const LangContext = createContext<Ctx>({ lang: 'en', setLang: () => {}, t: (s) => s });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('kk'); // язык по умолчанию
  const value = useMemo<Ctx>(
    () => ({ lang, setLang, t: (s) => (lang === 'en' ? s : dict[s]?.[lang] ?? s) }),
    [lang]
  );
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
