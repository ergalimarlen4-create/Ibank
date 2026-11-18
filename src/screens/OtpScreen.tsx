import { useLang } from '../i18n';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { colors, fonts } from '../theme';
import { ScreenProps } from '../navigation/types';

export default function OtpScreen({ navigation, route }: ScreenProps<'Otp'>) {
  const { t } = useLang();
  const [code, setCode] = useState('');
  return (
    <View style={styles.root}>
      <Header light title={t('Forgot password')} onBack={navigation.goBack} />
      <Card>
        <Text style={styles.label}>{t('Type a code')}</Text>
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Input placeholder={t('Code')} keyboardType="number-pad" autoFocus maxLength={6} value={code} onChangeText={setCode} />
          </View>
          <Button title={t('Resend')} style={styles.resend} onPress={() => {}} />
        </View>
        <Text style={styles.hint}>
          {t('We texted you a code to verify your phone number')} <Text style={styles.phone}>{route.params.phone}</Text>
        </Text>
        <Text style={styles.hint}>{t("This code will expired 10 minutes after this message. If you don't get a message.")}</Text>
        <Button title={t('Change password')} disabled={code.length < 4} style={{ marginTop: 20 }} onPress={() => navigation.navigate('ChangePassword')} />
      </Card>
      <Text style={styles.change} onPress={() => navigation.goBack()}>{t('Change your phone number')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  label: { fontFamily: fonts.regular, fontSize: 10, color: colors.muted, marginBottom: 8 },
  row: { flexDirection: 'row', gap: 8 },
  resend: { paddingHorizontal: 16 },
  hint: { fontFamily: fonts.regular, fontSize: 11, color: colors.muted, marginTop: 14 },
  phone: { fontFamily: fonts.medium, color: colors.primary },
  change: { textAlign: 'center', fontFamily: fonts.medium, fontSize: 10, color: colors.primary, marginTop: 24 },
});
