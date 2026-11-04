import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { SplashScreen } from './src/screens/SplashScreen';
import { WelcomeScreen } from './src/screens/WelcomeScreen';
import { SignInScreen } from './src/screens/SignInScreen';
import { SignUpStep1Screen } from './src/screens/SignUpStep1Screen';
import { SignUpStep2Screen } from './src/screens/SignUpStep2Screen';
import { ForgotPasswordScreen } from './src/screens/ForgotPasswordScreen';
import { OtpVerificationScreen } from './src/screens/OtpVerificationScreen';
import { ResetPasswordScreen } from './src/screens/ResetPasswordScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { CardDetailsScreen } from './src/screens/CardDetailsScreen';
import { SearchScreen } from './src/screens/SearchScreen';
import { InterestRateScreen } from './src/screens/InterestRateScreen';
import { ExchangeRateScreen } from './src/screens/ExchangeRateScreen';
import { LanguageScreen } from './src/screens/LanguageScreen';
import { ExchangeScreen } from './src/screens/ExchangeScreen';




const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUpStep1" component={SignUpStep1Screen} />
        <Stack.Screen name="SignUpStep2" component={SignUpStep2Screen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CardDetails" component={CardDetailsScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
<Stack.Screen name="InterestRate" component={InterestRateScreen} />
<Stack.Screen name="ExchangeRate" component={ExchangeRateScreen} />
<Stack.Screen name="Language" component={LanguageScreen} />
<Stack.Screen name="Exchange" component={ExchangeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}