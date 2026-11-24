import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import Button from '../components/Button';
import BillDetails from '../components/BillDetails';
import Verification from '../components/Verification';
import PickerModal from '../components/PickerModal';
import { useLang } from '../i18n';
import { colors, fonts, radius } from '../theme';
import { ScreenProps } from '../navigation/types';

const accountOpts = ['VISA **** **** **** 1234', '4411 0000 1234', '1900 8988 5456', '1900 8112 5222'];

export default function BillPayScreen({ navigation, route }: ScreenProps<'BillPay'>) {
  const { t } = useLang();
  const { kind } = route.params;
  const [acc, setAcc] = useState('');
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header light title={t(`${kind} bill`)} onBack={navigation.goBack} />
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
        {/* Замени на иллюстрацию из Figma */}
        <View style={styles.art}><Ionicons name="wallet" size={56} color={colors.primary} /></View>
        <Text style={styles.range}>01/10/2019 - 01/11/2019</Text>
        <BillDetails kind={kind} title={t('All the Bills')} />

        <Pressable style={[styles.box, styles.pick]} onPress={() => setOpen(true)}>
          <Text style={[styles.text, !acc && { color: colors.muted }]}>{acc || t('Choose account / card')}</Text>
          <Ionicons name="chevron-down" size={14} color={colors.muted} />
        </Pressable>
        <Verification onReady={setReady} />
        <Button title={t('Pay the bill')} disabled={!acc || !ready} style={{ marginTop: 24 }} onPress={() => navigation.replace('PaymentSuccess', { kind: 'bill', bill: kind })} />
      </ScrollView>
      <PickerModal visible={open} title={t('Choose account:')} options={accountOpts} selected={acc}
        onSelect={(v) => { setAcc(v); setOpen(false); }} onClose={() => setOpen(false)} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 16, paddingBottom: 32 },
  art: { alignSelf: 'center', width: 120, height: 120, borderRadius: 60, backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  range: { textAlign: 'center', fontFamily: fonts.regular, fontSize: 8, color: colors.muted, marginVertical: 12 },
  box: { height: 40, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, paddingHorizontal: 12, backgroundColor: '#fff', marginTop: 20 },
  pick: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  text: { fontFamily: fonts.regular, fontSize: 11, color: colors.text },
});
