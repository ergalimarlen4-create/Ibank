import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

export type Msg = { from: 'bank' | 'me'; text: string; date?: string };
export type Thread = {
  id: string; title: string; preview: string; time: string;
  icon: keyof typeof Ionicons.glyphMap; color: string; messages: Msg[];
};

export const threads: Thread[] = [
  {
    id: 'boa', title: 'Bank of America', preview: 'Bank of America : 256486 is the au…', time: 'Today',
    icon: 'business', color: colors.primary,
    messages: [
      { from: 'bank', date: '8/10/2018', text: 'Did you attempt transaction on debit card ending in 0000 at Mechanl in NJ for $1,200? Reply YES or NO' },
      { from: 'me', text: 'Yes' },
      { from: 'bank', date: '8/10/2018', text: "Bank of America : 256486 is your authorization code which expires in 10 minutes. If you didn't request the code. Call : 18009898 for assistance" },
    ],
  },
  {
    id: 'account', title: 'Account', preview: 'Your account is limited. Please foll…', time: '12/10',
    icon: 'person', color: colors.danger,
    messages: [{ from: 'bank', date: '12/10', text: 'Your account is limited. Please follow the instructions in the app to restore full access.' }],
  },
  {
    id: 'alert', title: 'Alert', preview: 'Your statement is ready for you to…', time: '11/10',
    icon: 'chatbubble-ellipses', color: '#3B82F6',
    messages: [{ from: 'bank', date: '11/10', text: 'Your statement is ready for you to view in the app.' }],
  },
  {
    id: 'paypal', title: 'Paypal', preview: 'Your account has been locked. Ple…', time: '10/11',
    icon: 'logo-paypal', color: colors.warning,
    messages: [{ from: 'bank', date: '10/11', text: 'Your account has been locked. Please contact support to unlock it.' }],
  },
  {
    id: 'withdraw', title: 'Withdraw', preview: 'Dear customer, 2987456 is your co…', time: '10/12',
    icon: 'cash', color: colors.success,
    messages: [{ from: 'bank', date: '10/12', text: 'Dear customer, 2987456 is your confirmation code for the withdrawal. Do not share it with anyone.' }],
  },
];
