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

const accountOpts = ['VISA **** **** **** 1234', '1900 8988 5456', '1900 8112 5222', '4411 0000 1234'];
const terms = [
  { key: '3 months', rate: 4 }, { key: '6 months', rate: 4.5 }, { key: '12 months', rate: 5 },
  { key: '18 months', rate: 5.5 }, { key: '24 months', rate: 6 },
];

export default function SaveOnlineAddScreen({ navigation }: ScreenProps<'SaveOnlineAdd'>) {
  const { t } = useLang();
  const [acc, setAcc] = useState('');
  const [term, setTerm] = useState('');
  const [amount, setAmount] = useState('');
  const [picker, setPicker] = useState<'acc' | 'term' | null>(null);
  const cur = terms.find((x) => x.key === term);
  const label = (x: (typeof terms)[number]) => `${t(x.key)} (${t('Interest rate')} ${x.rate}%)`;
  const ok = acc && term && Number(amount) >= 1000;

  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header light title={t('Add')} onBack={navigation.goBack} />
      <ScrollView keyboardShouldPersistTaps="handled">
        {/* Замени на иллюстрацию из Figma */}
        <View style={styles.art}><Ionicons name="cash" size={64} color={colors.primary} /></View>
        <Card>
          <Pressable style={[styles.box, styles.pick]} onPress={() => setPicker('acc')}>
            <Text style={[styles.text, !acc && { color: colors.muted }]}>{acc || t('Choose account / card')}</Text>
            <Ionicons name="chevron-down" size={14} color={colors.muted} />
          </Pressable>
          {!!acc && <Text style={styles.note}>{t('Available balance')}: 10000$</Text>}

          <Pressable style={[styles.box, styles.pick, { marginTop: 12 }]} onPress={() => setPicker('term')}>
            <Text style={[styles.text, !term && { color: colors.muted }]}>{term ? t(term) : t('Choose time deposit')}</Text>
            <Ionicons name="chevron-down" size={14} color={colors.muted} />
          </Pressable>
          {!!cur && <Text style={styles.note}>{t('Interest rate')} {cur.rate}%/ {t(cur.key)}</Text>}

          <TextInput style={[styles.box, styles.text, { marginTop: 12 }]} placeholder={t('Amount (At least $1000)')} placeholderTextColor={colors.muted}
            keyboardType="numeric" value={amount} onChangeText={setAmount} />
          <Button title={t('Verify')} disabled={!ok} style={{ marginTop: 24 }}
            onPress={() => navigation.navigate('PaymentConfirm', { kind: 'save', from: acc, to: t('Save online'), amount })} />
        </Card>
      </ScrollView>
      <PickerModal visible={picker === 'acc'} title={t('Choose account:')} options={accountOpts} selected={acc}
        onSelect={(v) => { setAcc(v); setPicker(null); }} onClose={() => setPicker(null)} />
      <PickerModal visible={picker === 'term'} title={t('Choose time deposit')} options={terms.map(label)} selected={cur ? label(cur) : ''}
        onSelect={(v) => { const x = terms.find((y) => label(y) === v); if (x) setTerm(x.key); setPicker(null); }} onClose={() => setPicker(null)} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  art: { alignSelf: 'center', width: 150, height: 150, borderRadius: 75, backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center', marginVertical: 20 },
  box: { height: 40, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, paddingHorizontal: 12, backgroundColor: '#fff' },
  pick: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  text: { fontFamily: fonts.regular, fontSize: 11, color: colors.text },
  note: { fontFamily: fonts.medium, fontSize: 8, color: colors.primary, marginTop: 6 },
});
