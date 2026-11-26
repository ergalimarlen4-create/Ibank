import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Profile = { name: string; photo: string | null };
const DEFAULT: Profile = { name: 'Push Puttichai', photo: null };
const KEY = 'ibank.profile';

type Ctx = { profile: Profile; setProfile: (p: Partial<Profile>) => void };
const ProfileContext = createContext<Ctx>({ profile: DEFAULT, setProfile: () => {} });

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setState] = useState<Profile>(DEFAULT);

  // Загружаем сохранённый профиль при запуске
  useEffect(() => {
    AsyncStorage.getItem(KEY)
      .then((v) => v && setState({ ...DEFAULT, ...JSON.parse(v) }))
      .catch(() => {});
  }, []);

  const setProfile: Ctx['setProfile'] = (p) => {
    setState((prev) => {
      const next = { ...prev, ...p };
      AsyncStorage.setItem(KEY, JSON.stringify(next)).catch(() => {});
      return next;
    });
  };

  return <ProfileContext.Provider value={{ profile, setProfile }}>{children}</ProfileContext.Provider>;
}

export const useProfile = () => useContext(ProfileContext);
