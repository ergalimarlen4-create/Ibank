import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

import { LanguageProvider } from './src/i18n';
import { RootStackParamList } from './src/navigation/types';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import OtpScreen from './src/screens/OtpScreen';
import ChangePasswordScreen from './src/screens/ChangePasswordScreen';
import PasswordChangedScreen from './src/screens/PasswordChangedScreen';
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import SearchBranchScreen from './src/screens/SearchBranchScreen';
import InterestRateScreen from './src/screens/InterestRateScreen';
import ExchangeRateScreen from './src/screens/ExchangeRateScreen';
import LanguageScreen from './src/screens/LanguageScreen';
import ExchangeScreen from './src/screens/ExchangeScreen';
import TransferScreen from './src/screens/TransferScreen';
import ConfirmScreen from './src/screens/ConfirmScreen';
import TransferSuccessScreen from './src/screens/TransferSuccessScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [loaded] = useFonts({ Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold });
  if (!loaded) return null;

  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="Otp" component={OtpScreen} />
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
            <Stack.Screen name="PasswordChanged" component={PasswordChangedScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="SearchBranch" component={SearchBranchScreen} />
            <Stack.Screen name="InterestRate" component={InterestRateScreen} />
            <Stack.Screen name="ExchangeRate" component={ExchangeRateScreen} />
            <Stack.Screen name="Language" component={LanguageScreen} />
            <Stack.Screen name="Exchange" component={ExchangeScreen} />
            <Stack.Screen name="Transfer" component={TransferScreen} />
            <Stack.Screen name="ConfirmScreen" component={ConfirmScreen} />
            <Stack.Screen name="TransferSuccessScreen" component={TransferSuccessScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}