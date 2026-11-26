import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type FestiveMode = 'off' | 'newyear' | 'independence';
export const KZ_BLUE = '#00AFCA';
export const KZ_GOLD = '#FEC50C';
const KEY = 'ibank.festive';

type Ctx = { mode: FestiveMode; setMode: (m: FestiveMode) => void };
const FestiveContext = createContext<Ctx>({ mode: 'off', setMode: () => {} });

export function FestiveProvider({ children }: { children: ReactNode }) {
  const [mode, setState] = useState<FestiveMode>('off');
  useEffect(() => {
    AsyncStorage.getItem(KEY).then((v) => { if (v === 'newyear' || v === 'independence' || v === 'off') setState(v); }).catch(() => {});
  }, []);
  const setMode = (m: FestiveMode) => { setState(m); AsyncStorage.setItem(KEY, m).catch(() => {}); };
  return <FestiveContext.Provider value={{ mode, setMode }}>{children}</FestiveContext.Provider>;
}

export const useFestive = () => useContext(FestiveContext);
