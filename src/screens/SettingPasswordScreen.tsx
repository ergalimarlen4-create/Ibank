import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { useLang } from '../i18n';
import { colors, fonts } from '../theme';
import { ScreenProps } from '../navigation/types';

export default function SettingPasswordScreen({ navigation }: ScreenProps<'SettingPassword'>) {
  const { t } = useLang();
  const [recent, setRecent] = useState('');
  const [pass, setPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const valid = recent.length > 0 && pass.length >= 6 && pass === confirm;
  return (
    <View style={styles.root}>
      <Header light title={t('Change password')} onBack={navigation.goBack} />
      <Card>
        <Text style={styles.label}>{t('Recent password')}</Text>
        <Input password placeholder={t('Recent password')} value={recent} onChangeText={setRecent} />
        <Text style={[styles.label, { marginTop: 14 }]}>{t('New password')}</Text>
        <Input password placeholder={t('New password')} value={pass} onChangeText={setPass} />
        <Text style={[styles.label, { marginTop: 14 }]}>{t('Confirm password')}</Text>
        <Input password placeholder={t('Confirm new password')} value={confirm} onChangeText={setConfirm} />
        <Button title={t('Change password')} disabled={!valid} style={{ marginTop: 40 }} onPress={() => navigation.replace('PasswordChanged')} />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  label: { fontFamily: fonts.regular, fontSize: 9, color: colors.muted, marginBottom: 6 },
});
