import { useLang } from '../i18n';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { colors, fonts } from '../theme';
import { ScreenProps } from '../navigation/types';

export default function ChangePasswordScreen({ navigation }: ScreenProps<'ChangePassword'>) {
  const { t } = useLang();
  const [pass, setPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const valid = pass.length >= 6 && pass === confirm;
  return (
    <View style={styles.root}>
      <Header light title={t('Change password')} onBack={navigation.goBack} />
      <Card>
        <Text style={styles.label}>{t('Type your new password')}</Text>
        <Input password autoFocus value={pass} onChangeText={setPass} />
        <Text style={[styles.label, { marginTop: 16 }]}>{t('Confirm password')}</Text>
        <Input password value={confirm} onChangeText={setConfirm} />
        <Button title={t('Change password')} disabled={!valid} style={{ marginTop: 28 }} onPress={() => navigation.replace('PasswordChanged')} />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  label: { fontFamily: fonts.regular, fontSize: 10, color: colors.muted, marginBottom: 8 },
});
