import { createContext, ReactNode, useContext, useState } from 'react';

export type Ben = { id: string; name: string; card: string; group: 'card' | 'same' | 'other'; bank?: string; branch?: string };

const initial: Ben[] = [
  { id: 'push', name: 'Push', card: '12768980890', group: 'card' },
  { id: 'olivia', name: 'Olivia', card: '0345976231', group: 'card' },
  { id: 'alexander', name: 'Alexander', card: '12788980890', group: 'same' },
  { id: 'harper', name: 'Harper', card: '0345976231', group: 'same' },
  { id: 'thomas', name: 'Thomas', card: '12788980890', group: 'other', bank: 'Citibank', branch: 'New York' },
  { id: 'sanmatha', name: 'Sanmatha', card: '0345976231', group: 'other', bank: 'Citibank', branch: 'New York' },
  { id: 'justin', name: 'Justin Biber', card: '12788980890', group: 'other', bank: 'Citibank', branch: 'New York' },
];

export const banks = ['Fifth Third', 'Bank of the West', 'Wells Fargo', 'JP Morgan Chase', 'US bank', 'HSBC bank', 'Citibank', 'American Express'];
export const branches = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami'];

type Ctx = { list: Ben[]; add: (b: Omit<Ben, 'id'>) => void; update: (id: string, patch: Partial<Ben>) => void };
const BenContext = createContext<Ctx>({ list: initial, add: () => {}, update: () => {} });

export function BeneficiariesProvider({ children }: { children: ReactNode }) {
  const [list, setList] = useState<Ben[]>(initial);
  const add: Ctx['add'] = (b) => setList((l) => [...l, { ...b, id: String(Date.now()) }]);
  const update: Ctx['update'] = (id, patch) => setList((l) => l.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  return <BenContext.Provider value={{ list, add, update }}>{children}</BenContext.Provider>;
}

export const useBeneficiaries = () => useContext(BenContext);
