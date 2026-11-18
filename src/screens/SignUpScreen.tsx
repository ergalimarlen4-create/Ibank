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

export default function SignUpScreen({ navigation }: ScreenProps<'SignUp'>) {
  const { t } = useLang();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const canSubmit = name && phone && password && agree;

  return (
    <AuthLayout header={t('Sign up')} title={t('Welcome to us,')} subtitle={t('Hello there, create New account')} onBack={navigation.goBack}>
      <Illustration icon="phone-portrait" />
      <View style={{ gap: 12 }}>
        <Input placeholder={t('Name')} value={name} onChangeText={setName} />
        <Input placeholder="(+84) 000000000" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
        <Input placeholder={t('Password')} password value={password} onChangeText={setPassword} />
      </View>
      <Pressable style={styles.agreeRow} onPress={() => setAgree((a) => !a)}>
        <View style={[styles.box, agree && styles.boxOn]}>
          {agree && <Ionicons name="checkmark" size={12} color={colors.primary} />}
        </View>
        <Text style={styles.agreeText}>
          {t('By creating an account your aggree to our')}{' '}<Text style={styles.link}>{t('Term and Condtions')}</Text>
        </Text>
      </Pressable>
      <Button title={t('Sign up')} disabled={!canSubmit} onPress={() => navigation.replace('Home')} style={{ marginTop: 24 }} />
      <Text style={styles.bottom}>
        {t('Have an account?')}{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('SignIn')}>{t('Sign In')}</Text>
      </Text>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  agreeRow: { flexDirection: 'row', gap: 8, marginTop: 14, alignItems: 'flex-start' },
  box: { width: 16, height: 16, borderRadius: 3, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  boxOn: { borderColor: colors.primary },
  agreeText: { flex: 1, fontFamily: fonts.regular, fontSize: 10, color: colors.muted },
  link: { fontFamily: fonts.semibold, color: colors.primary },
  bottom: { textAlign: 'center', fontFamily: fonts.regular, fontSize: 10, color: colors.text, marginTop: 16 },
});
