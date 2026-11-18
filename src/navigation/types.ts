import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Otp: { phone: string };
  ChangePassword: undefined;
  PasswordChanged: undefined;
  Home: undefined;
  Search: undefined;
  SearchBranch: undefined;
  InterestRate: undefined;
  ExchangeRate: undefined;
  Language: undefined;
  Exchange: undefined;
  Transfer: undefined;
};

export type ScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
