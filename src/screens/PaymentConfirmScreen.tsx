import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import Button from '../components/Button';
import Verification from '../components/Verification';
import { useLang } from '../i18n';
import { colors, fonts, radius } from '../theme';
import { ScreenProps } from '../navigation/types';

export default function PaymentConfirmScreen({ navigation, route }: ScreenProps<'PaymentConfirm'>) {
  const { t } = useLang();
  const p = route.params;
  const [ready, setReady] = useState(false);
  const rows: [string, string][] = [['From', p.from], ['To', p.to], ['Amount', `$${p.amount}`]];
  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header light title={t('Confirm')} onBack={navigation.goBack} />
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
        <Text style={styles.info}>{t('Confirm transaction information')}</Text>
        {rows.map(([k, v]) => (
          <View key={k} style={styles.group}>
            <Text style={styles.label}>{t(k)}</Text>
            <View style={styles.box}><Text style={styles.value}>{v}</Text></View>
          </View>
        ))}
        <Verification onReady={setReady} />
        <Button title={t('Confirm')} disabled={!ready} style={{ marginTop: 24 }} onPress={() => navigation.replace('PaymentSuccess', { kind: p.kind })} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 16, paddingBottom: 32 },
  info: { fontFamily: fonts.regular, fontSize: 9, color: colors.muted, marginBottom: 12 },
  group: { marginBottom: 12 },
  label: { fontFamily: fonts.regular, fontSize: 9, color: colors.muted, marginBottom: 6 },
  box: { height: 40, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, paddingHorizontal: 12, justifyContent: 'center' },
  value: { fontFamily: fonts.regular, fontSize: 11, color: colors.text },
});
