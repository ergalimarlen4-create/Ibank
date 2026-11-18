import { useLang } from '../i18n';
import { useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import { colors, fonts, radius } from '../theme';
import { ScreenProps } from '../navigation/types';

// rate = сколько единиц валюты в 1 USD (тестовые значения)
const currencies = [
  { code: 'VND', name: 'Viet Nam Dong', rate: 24500 },
  { code: 'HKD', name: 'Hong Kong Dollar', rate: 7.8 },
  { code: 'USD', name: 'Dollar', rate: 1 },
  { code: 'TWD', name: 'Taiwan Dollar', rate: 31 },
  { code: 'JMD', name: 'Jamaica Dollar', rate: 155 },
  { code: 'KRW', name: 'Korean Won', rate: 1122 },
  { code: 'KZT', name: 'Kazakhstan Tenge', rate: 520 },
];
const rateOf = (c: string) => currencies.find((x) => x.code === c)!.rate;

function AmountField({ label, value, onChange, code, onPickCurrency, editable = true }: {
  label: string; value: string; onChange?: (v: string) => void; code: string; onPickCurrency: () => void; editable?: boolean;
}) {
  const { t } = useLang();
  return (
    <View>
      <Text style={styles.label}>{t(label)}</Text>
      <View style={styles.field}>
        <TextInput style={styles.amount} placeholder={t('Amount')} placeholderTextColor={colors.muted} keyboardType="numeric" value={value} onChangeText={onChange} editable={editable} />
        <Pressable style={styles.cur} onPress={onPickCurrency}>
          <Text style={styles.curText}>{code}</Text>
          <Ionicons name="chevron-expand" size={14} color={colors.muted} />
        </Pressable>
      </View>
    </View>
  );
}

export default function ExchangeScreen({ navigation }: ScreenProps<'Exchange'>) {
  const { t } = useLang();
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('KRW');
  const [amount, setAmount] = useState('');
  const [picking, setPicking] = useState<'from' | 'to' | null>(null);

  const ratio = rateOf(to) / rateOf(from);
  const num = parseFloat(amount.replace(',', '.'));
  const result = isNaN(num) ? '' : String(Math.round(num * ratio * 100) / 100);
  const fmt = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 4 });

  const pick = (code: string) => {
    picking === 'from' ? setFrom(code) : setTo(code);
    setPicking(null);
  };
  const swap = () => { setFrom(to); setTo(from); };

  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header light title={t('Exchange')} onBack={navigation.goBack} />
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom: 24 }}>
        {/* Замени на иллюстрацию из Figma */}
        <View style={styles.art}><Ionicons name="phone-portrait" size={96} color={colors.primary} /></View>
        <Card>
          <AmountField label="From" value={amount} onChange={setAmount} code={from} onPickCurrency={() => setPicking('from')} />
          <Pressable style={styles.swap} onPress={swap}>
            <Ionicons name="arrow-down" size={18} color={colors.primary} />
            <Ionicons name="arrow-up" size={18} color={colors.danger} />
          </Pressable>
          <AmountField label="To" value={result} code={to} editable={false} onPickCurrency={() => setPicking('to')} />
          {!!amount && (
            <View style={styles.rateRow}>
              <Text style={styles.rateLabel}>{t('Currency rate')}</Text>
              <Text style={styles.rateVal}>1 {from} = {fmt(ratio)} {to}</Text>
            </View>
          )}
          <Button title={t('Exchange')} disabled={isNaN(num) || num <= 0} style={{ marginTop: 24 }} />
        </Card>
      </ScrollView>

      <Modal visible={!!picking} transparent animationType="fade" onRequestClose={() => setPicking(null)}>
        <Pressable style={styles.backdrop} onPress={() => setPicking(null)}>
          <Pressable style={styles.modal}>
            <Text style={styles.modalTitle}>{t('Select the currency')}</Text>
            <Pressable style={styles.close} onPress={() => setPicking(null)} hitSlop={10}>
              <Ionicons name="close" size={18} color={colors.text} />
            </Pressable>
            {currencies.map((c) => {
              const on = c.code === (picking === 'from' ? from : to);
              return (
                <Pressable key={c.code} style={styles.opt} onPress={() => pick(c.code)}>
                  <Text style={[styles.optText, on && styles.optOn]}>{c.code} ( {t(c.name)} )</Text>
                  {on && <Ionicons name="checkmark" size={16} color={colors.primary} />}
                </Pressable>
              );
            })}
          </Pressable>
        </Pressable>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  art: { height: 180, alignItems: 'center', justifyContent: 'center' },
  label: { fontFamily: fonts.regular, fontSize: 10, color: colors.muted, marginBottom: 6 },
  field: { flexDirection: 'row', alignItems: 'center', height: 40, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md },
  amount: { flex: 1, paddingHorizontal: 12, fontFamily: fonts.regular, fontSize: 12, color: colors.text },
  cur: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, height: '100%', borderLeftWidth: 1, borderLeftColor: colors.border },
  curText: { fontFamily: fonts.regular, fontSize: 11, color: colors.text },
  swap: { flexDirection: 'row', alignSelf: 'center', marginVertical: 14 },
  rateRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  rateLabel: { fontFamily: fonts.regular, fontSize: 10, color: colors.primary },
  rateVal: { fontFamily: fonts.regular, fontSize: 10, color: colors.text },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end', padding: 16, paddingBottom: 120 },
  modal: { backgroundColor: '#fff', borderRadius: 12, padding: 20 },
  modalTitle: { textAlign: 'center', fontFamily: fonts.medium, fontSize: 12, color: colors.text, marginBottom: 8 },
  close: { position: 'absolute', top: 16, right: 16 },
  opt: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 40 },
  optText: { fontFamily: fonts.regular, fontSize: 12, color: colors.muted },
  optOn: { fontFamily: fonts.medium, color: colors.primary },
});
