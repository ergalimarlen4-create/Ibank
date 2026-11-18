import { useLang } from '../i18n';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AuthLayout from '../components/AuthLayout';
import Illustration from '../components/Illustration';
import Input from '../components/Input';
import Button from '../components/Button';
import { colors, fonts } from '../theme';
import { ScreenProps } from '../navigation/types';

export default function SignInScreen({ navigation }: ScreenProps<'SignIn'>) {
  const { t } = useLang();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const canSubmit = login.length > 0 && password.length > 0;

  return (
    <AuthLayout header={t('Sign in')} title={t('Welcome Back')} subtitle={t('Hello there, sign in to continue')}>
      <Illustration icon="lock-closed" />
      <View style={{ gap: 12 }}>
        <Input placeholder={t('Text input')} value={login} onChangeText={setLogin} />
        <Input placeholder={t('Password')} password value={password} onChangeText={setPassword} />
      </View>
      <Pressable style={styles.forgot} onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotText}>{t('Forgot your password ?')}</Text>
      </Pressable>
      <Button title={t('Sign in')} disabled={!canSubmit} onPress={() => navigation.replace('Home')} style={{ marginTop: 24 }} />
      <Ionicons name="finger-print" size={56} color={colors.primary} style={styles.finger} />
      <Text style={styles.bottom}>
        {t("Don't have an account?")}{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>{t('Sign Up')}</Text>
      </Text>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  forgot: { alignSelf: 'flex-end', marginTop: 8 },
  forgotText: { fontFamily: fonts.regular, fontSize: 10, color: colors.muted },
  finger: { alignSelf: 'center', marginTop: 24 },
  bottom: { textAlign: 'center', fontFamily: fonts.regular, fontSize: 10, color: colors.text, marginTop: 16 },
  link: { fontFamily: fonts.semibold, color: colors.primary },
});
