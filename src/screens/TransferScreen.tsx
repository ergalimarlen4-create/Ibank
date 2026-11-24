import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import PickerModal from '../components/PickerModal';
import { useLang } from '../i18n';
import { amountInWords } from '../i18n/numberWords';
import { colors, fonts, radius } from '../theme';
import { ScreenProps } from '../navigation/types';

const types = [
  { key: 'card', icon: 'card', label: 'Transfer via\ncard number' },
  { key: 'same', icon: 'person', label: 'Transfer to\nthe same bank' },
  { key: 'other', icon: 'business', label: 'Transfer to\nanother bank' },
] as const;
const people = [
  { name: 'Emma', card: '1235 6478 990' },
  { name: 'Justin', card: '9876 5432 101' },
];
const accounts = [
  { id: 'acc', number: '1234 5678 5689', mask: '**** **** 5689' },
  { id: 'visa', number: '**** **** **** 1234', mask: '**** **** 1234' },
];
const banks = ['Fifth Third', 'Bank of the West', 'Wells Fargo', 'JP Morgan Chase', 'US bank', 'HSBC bank', 'Citibank', 'American Express'];
const branches = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami'];

// Текстовое поле: подпись сверху появляется, когда поле заполнено (только для "another bank")
function LField({ label, ...props }: React.ComponentProps<typeof TextInput> & { label?: string }) {
  return (
    <View>
      {!!label && !!props.value && <Text style={styles.fLabel}>{label}</Text>}
      <TextInput placeholderTextColor={colors.muted} {...props} style={styles.input} />
    </View>
  );
}

function PickBox({ label, value, onPress }: { label: string; value: string; onPress: () => void }) {
  return (
    <View>
      {!!value && <Text style={styles.fLabel}>{label}</Text>}
      <Pressable style={[styles.input, styles.pickRow]} onPress={onPress}>
        <Text style={[styles.pickText, !value && { color: colors.muted }]}>{value || label}</Text>
        <Ionicons name={value ? 'chevron-forward' : 'chevron-down'} size={14} color={colors.muted} />
      </Pressable>
    </View>
  );
}

export default function TransferScreen({ navigation }: ScreenProps<'Transfer'>) {
  const { t, lang } = useLang();
  const [acc, setAcc] = useState(accounts[1]);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<string>('card');
  const [ben, setBen] = useState<string | null>(null);
  const [bank, setBank] = useState('');
  const [branch, setBranch] = useState('');
  const [picker, setPicker] = useState<'bank' | 'branch' | null>(null);
  const [name, setName] = useState('');
  const [card, setCard] = useState('');
  const [amount, setAmount] = useState('');
  const [content, setContent] = useState('');
  const [save, setSave] = useState(false);

  const other = type === 'other';
  const ok = name && card && amount && (!other || (bank && branch));
  const words = amountInWords(amount, lang);
  const label = (a: (typeof accounts)[number]) => (a.id === 'acc' ? `${t('Account')} ${a.number}` : `VISA ${a.number}`);

  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header light title={t('Transfer')} onBack={navigation.goBack} />
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom: 32 }}>
        <View style={styles.pad}>
          <Text style={styles.top}>{t('Choose account / card')}</Text>
          <Pressable style={styles.select} onPress={() => setOpen((o) => !o)}>
            <Text style={styles.selectText}>{label(acc)}</Text>
            <Ionicons name="chevron-expand" size={16} color={colors.muted} />
          </Pressable>
          {open && (
            <View style={styles.dropdown}>
              {accounts.map((a) => (
                <Pressable key={a.id} style={styles.opt} onPress={() => { setAcc(a); setOpen(false); }}>
                  <Text style={[styles.selectText, a.id === acc.id && { color: colors.primary, fontFamily: fonts.medium }]}>{label(a)}</Text>
                </Pressable>
              ))}
            </View>
          )}
          <Text style={styles.balance}>{t('Available balance')} : 10,000$</Text>

          <Text style={styles.section}>{t('Choose transaction')}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
            {types.map((tp) => {
              const on = tp.key === type;
              const bg = tp.key === 'other' ? colors.warning : colors.primary;
              return (
                <Pressable key={tp.key} style={[styles.type, on && { backgroundColor: bg }]} onPress={() => setType(tp.key)}>
                  <Ionicons name={tp.icon} size={20} color={on ? '#fff' : colors.muted} />
                  <Text style={[styles.typeText, on && { color: '#fff' }]}>{t(tp.label)}</Text>
                </Pressable>
              );
            })}
          </ScrollView>

          <View style={styles.benHead}>
            <Text style={styles.section}>{t('Choose beneficiary')}</Text>
            <Text style={styles.find}>{t('Find beneficiary')}</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
            <View style={[styles.ben, { backgroundColor: colors.primaryLight }]}>
              <Ionicons name="add" size={24} color="#fff" />
            </View>
            {people.map((p) => {
              const on = ben === p.name;
              return (
                <Pressable key={p.name} style={[styles.ben, on && { backgroundColor: colors.primary }]} onPress={() => { setBen(p.name); setName(p.name); setCard(p.card); }}>
                  <View style={styles.avatar}><Ionicons name="person" size={20} color={colors.primary} /></View>
                  <Text style={[styles.benName, on && { color: '#fff' }]}>{p.name}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <Card>
          <View style={{ gap: 12 }}>
            {other && <PickBox label={t('Choose bank')} value={bank} onPress={() => setPicker('bank')} />}
            {other && <PickBox label={t('Choose branch')} value={branch} onPress={() => setPicker('branch')} />}
            <LField label={other ? t('Name') : undefined} placeholder={t('Name')} value={name} onChangeText={setName} />
            <LField label={other ? t('Card number') : undefined} placeholder={t('Card number')} keyboardType="number-pad" value={card} onChangeText={setCard} />
            <View>
              <LField label={other ? t('Amount') : undefined} placeholder={t('Amount')} keyboardType="numeric" value={amount} onChangeText={setAmount} />
              {!!words && <Text style={styles.words}>{words}</Text>}
            </View>
            <LField label={other ? t('Note') : t('Content')} placeholder={other ? t('Note') : t('Content')} value={content} onChangeText={setContent} />
          </View>
          <Pressable style={styles.checkRow} onPress={() => setSave((s) => !s)}>
            <View style={[styles.box, save && { borderColor: colors.primary }]}>
              {save && <Ionicons name="checkmark" size={12} color={colors.primary} />}
            </View>
            <Text style={styles.checkText}>{t('Save to directory of beneficiary')}</Text>
          </Pressable>
          <Button
            title={t('Confirm')}
            disabled={!ok}
            style={{ marginTop: 20 }}
            onPress={() => navigation.navigate('TransferConfirm', { from: acc.mask, name, card, amount, content, bank: other ? bank : undefined })}
          />
        </Card>
      </ScrollView>

      <PickerModal visible={picker === 'bank'} title={t('Choose beneficiary bank')} options={banks} selected={bank} searchable
        onSelect={(v) => { setBank(v); setPicker(null); }} onClose={() => setPicker(null)} />
      <PickerModal visible={picker === 'branch'} title={t('Choose branch')} options={branches} selected={branch}
        onSelect={(v) => { setBranch(v); setPicker(null); }} onClose={() => setPicker(null)} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.screen },
  pad: { paddingHorizontal: 16 },
  top: { fontFamily: fonts.regular, fontSize: 9, color: colors.muted, marginBottom: 6 },
  select: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 40, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, paddingHorizontal: 12, backgroundColor: '#fff' },
  selectText: { fontFamily: fonts.regular, fontSize: 11, color: colors.text },
  dropdown: { backgroundColor: '#fff', borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, marginTop: 4 },
  opt: { height: 38, justifyContent: 'center', paddingHorizontal: 12 },
  balance: { fontFamily: fonts.medium, fontSize: 9, color: colors.primary, marginTop: 6 },
  section: { fontFamily: fonts.regular, fontSize: 9, color: colors.muted, marginTop: 18, marginBottom: 8 },
  type: { width: 84, height: 72, borderRadius: 8, backgroundColor: '#E9E9EE', padding: 8, justifyContent: 'space-between' },
  typeText: { fontFamily: fonts.regular, fontSize: 8, color: colors.muted },
  benHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  find: { fontFamily: fonts.medium, fontSize: 9, color: colors.primary, marginBottom: 8 },
  ben: { width: 68, height: 76, borderRadius: 8, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', gap: 6 },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  benName: { fontFamily: fonts.regular, fontSize: 9, color: colors.text },
  fLabel: { fontFamily: fonts.regular, fontSize: 8, color: colors.muted, marginBottom: 4 },
  input: { height: 40, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, paddingHorizontal: 12, fontFamily: fonts.regular, fontSize: 11, color: colors.text },
  pickRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  pickText: { fontFamily: fonts.regular, fontSize: 11, color: colors.text },
  words: { fontFamily: fonts.medium, fontSize: 8, color: colors.primary, marginTop: 4 },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 14 },
  box: { width: 16, height: 16, borderRadius: 3, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  checkText: { fontFamily: fonts.regular, fontSize: 10, color: colors.muted },
});
