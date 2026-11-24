import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import PickerModal from '../components/PickerModal';
import { useLang } from '../i18n';
import { colors, fonts, radius } from '../theme';
import { ScreenProps } from '../navigation/types';

const companies: Record<string, string[]> = {
  Electric: ['Capi Energy', 'National Grid'],
  Water: ['Capi Water', 'City Water'],
  Mobile: ['Capi Telecom', 'Viettel', 'VNPT'],
  Internet: ['Capi Telecom', 'Viettel', 'VNPT', 'FPT'],
};

export default function BillCheckScreen({ navigation, route }: ScreenProps<'BillCheck'>) {
  const { t } = useLang();
  const { kind } = route.params;
  const [company, setCompany] = useState('');
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState('');
  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header light title={t('Pay the bill')} onBack={navigation.goBack} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <Card>
          <Pressable style={[styles.box, styles.pick]} onPress={() => setOpen(true)}>
            <Text style={[styles.text, !company && { color: colors.muted }]}>{company || t('Choose company')}</Text>
            <Ionicons name="chevron-down" size={14} color={colors.muted} />
          </Pressable>
          <Text style={styles.label}>{t(`Type ${kind.toLowerCase()} bill code`)}</Text>
          <TextInput style={[styles.box, styles.text]} placeholder={t('Bill code')} placeholderTextColor={colors.muted} keyboardType="number-pad" value={code} onChangeText={setCode} />
          <Text style={styles.hint}>{t('Please enter the correct bill code to check information.')}</Text>
          <Button title={t('Check')} disabled={!company || !code} onPress={() => navigation.navigate('BillPay', { kind, company })} />
        </Card>
      </ScrollView>
      <PickerModal visible={open} title={t('Choose company')} options={companies[kind] ?? companies.Internet} selected={company}
        onSelect={(v) => { setCompany(v); setOpen(false); }} onClose={() => setOpen(false)} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  box: { height: 40, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, paddingHorizontal: 12, backgroundColor: '#fff' },
  pick: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  text: { fontFamily: fonts.regular, fontSize: 11, color: colors.text },
  label: { fontFamily: fonts.regular, fontSize: 8, color: colors.muted, marginTop: 14, marginBottom: 6 },
  hint: { fontFamily: fonts.regular, fontSize: 9, color: colors.muted, lineHeight: 14, marginVertical: 16 },
});
