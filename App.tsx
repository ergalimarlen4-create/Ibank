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
import TransferConfirmScreen from './src/screens/TransferConfirmScreen';
import TransferSuccessScreen from './src/screens/TransferSuccessScreen';
import MessagesScreen from './src/screens/MessagesScreen';
import ChatScreen from './src/screens/ChatScreen';
import SettingScreen from './src/screens/SettingScreen';
import AppInfoScreen from './src/screens/AppInfoScreen';
import SettingPasswordScreen from './src/screens/SettingPasswordScreen';
import TransactionReportScreen from './src/screens/TransactionReportScreen';
import AccountCardScreen from './src/screens/AccountCardScreen';
import CardDetailScreen from './src/screens/CardDetailScreen';
import WithdrawScreen from './src/screens/WithdrawScreen';
import MobilePrepaidScreen from './src/screens/MobilePrepaidScreen';
import PayBillScreen from './src/screens/PayBillScreen';
import PaymentHistoryScreen from './src/screens/PaymentHistoryScreen';
import PaymentConfirmScreen from './src/screens/PaymentConfirmScreen';
import PaymentSuccessScreen from './src/screens/PaymentSuccessScreen';
import BillCheckScreen from './src/screens/BillCheckScreen';
import BillPayScreen from './src/screens/BillPayScreen';
import BillDetailScreen from './src/screens/BillDetailScreen';
import SaveOnlineScreen from './src/screens/SaveOnlineScreen';
import SaveOnlineAddScreen from './src/screens/SaveOnlineAddScreen';
import ChooseCardScreen from './src/screens/ChooseCardScreen';
import SaveManagementScreen from './src/screens/SaveManagementScreen';
import DirectoryScreen from './src/screens/DirectoryScreen';
import AddBeneficiaryScreen from './src/screens/AddBeneficiaryScreen';
import BeneficiaryDetailScreen from './src/screens/BeneficiaryDetailScreen';
import CreditCardScreen from './src/screens/CreditCardScreen';
import CreditPayScreen from './src/screens/CreditPayScreen';
import { BeneficiariesProvider } from './src/data/beneficiaries';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [loaded] = useFonts({ Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold });
  if (!loaded) return null;

  return (
    <SafeAreaProvider>
      <LanguageProvider>
      <BeneficiariesProvider>
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
          <Stack.Screen name="TransferConfirm" component={TransferConfirmScreen} />
          <Stack.Screen name="TransferSuccess" component={TransferSuccessScreen} />
          <Stack.Screen name="Messages" component={MessagesScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Setting" component={SettingScreen} />
          <Stack.Screen name="AppInfo" component={AppInfoScreen} />
          <Stack.Screen name="SettingPassword" component={SettingPasswordScreen} />
          <Stack.Screen name="TransactionReport" component={TransactionReportScreen} />
          <Stack.Screen name="AccountCard" component={AccountCardScreen} />
          <Stack.Screen name="CardDetail" component={CardDetailScreen} />
          <Stack.Screen name="Withdraw" component={WithdrawScreen} />
          <Stack.Screen name="MobilePrepaid" component={MobilePrepaidScreen} />
          <Stack.Screen name="PayBill" component={PayBillScreen} />
          <Stack.Screen name="PaymentHistory" component={PaymentHistoryScreen} />
          <Stack.Screen name="PaymentConfirm" component={PaymentConfirmScreen} />
          <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
          <Stack.Screen name="BillCheck" component={BillCheckScreen} />
          <Stack.Screen name="BillPay" component={BillPayScreen} />
          <Stack.Screen name="BillDetail" component={BillDetailScreen} />
          <Stack.Screen name="SaveOnline" component={SaveOnlineScreen} />
          <Stack.Screen name="SaveOnlineAdd" component={SaveOnlineAddScreen} />
          <Stack.Screen name="ChooseCard" component={ChooseCardScreen} />
          <Stack.Screen name="SaveManagement" component={SaveManagementScreen} />
          <Stack.Screen name="Directory" component={DirectoryScreen} />
          <Stack.Screen name="AddBeneficiary" component={AddBeneficiaryScreen} />
          <Stack.Screen name="BeneficiaryDetail" component={BeneficiaryDetailScreen} />
          <Stack.Screen name="CreditCard" component={CreditCardScreen} />
          <Stack.Screen name="CreditPay" component={CreditPayScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </BeneficiariesProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}
