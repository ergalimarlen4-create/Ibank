import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import Button from '../components/Button';
import PickerModal from '../components/PickerModal';
import { useLang } from '../i18n';
import { colors, fonts, radius } from '../theme';
import { ScreenProps } from '../navigation/types';

const accountOpts = ['VISA **** **** **** 1234', '1900 8988 5456', '1900 8112 5222', '4411 0000 1234'];
const people = ['Emma', 'Justin'];
const amounts = ['$10', '$20', '$30'];

export default function MobilePrepaidScreen({ navigation }: ScreenProps<'MobilePrepaid'>) {
  const { t } = useLang();
  const [acc, setAcc] = useState('');
  const [open, setOpen] = useState(false);
  const [ben, setBen] = useState<string | null>(null);
  const [phone, setPhone] = useState('');
  const [amt, setAmt] = useState('');
  const ok = acc && phone && amt;

  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header light title={t('Mobile prepaid')} onBack={navigation.goBack} />
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
        {!!acc && <Text style={styles.label0}>{t('Choose account / card')}</Text>}
        <Pressable style={[styles.box, styles.pick]} onPress={() => setOpen(true)}>
          <Text style={[styles.text, !acc && { color: colors.muted }]}>{acc || t('Choose account / card')}</Text>
          <Ionicons name="chevron-down" size={14} color={colors.muted} />
        </Pressable>
        {!!acc && <Text style={styles.balance}>{t('Available balance')} : 10,000$</Text>}

        <View style={styles.dirHead}>
          <Text style={styles.label}>{t('Directory')}</Text>
          <Text style={styles.find}>{t('Find beneficiary')}</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
          <View style={[styles.ben, { backgroundColor: colors.primaryLight }]}><Ionicons name="add" size={24} color="#fff" /></View>
          {people.map((p) => {
            const on = ben === p;
            return (
              <Pressable key={p} style={[styles.ben, on && { backgroundColor: colors.primary }]} onPress={() => { setBen(p); setPhone('+8564757899'); }}>
                <View style={styles.avatar}><Ionicons name="person" size={20} color={colors.primary} /></View>
                <Text style={[styles.benName, on && { color: '#fff' }]}>{p}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {!!phone && <Text style={styles.label}>{t('Phone number')}</Text>}
        <TextInput style={[styles.box, styles.text, !phone && { marginTop: 18 }]} placeholder={t('Phone number')} placeholderTextColor={colors.muted}
          keyboardType="phone-pad" value={phone} onChangeText={setPhone} />

        <Text style={styles.label}>{t('Choose amount')}</Text>
        <View style={styles.chips}>
          {amounts.map((a) => (
            <Pressable key={a} style={[styles.chip, amt === a && styles.chipOn]} onPress={() => setAmt(a)}>
              <Text style={[styles.chipText, amt === a && { color: '#fff' }]}>{a}</Text>
            </Pressable>
          ))}
        </View>

        <Button title={t('Confirm')} disabled={!ok} style={{ marginTop: 40 }}
          onPress={() => navigation.navigate('PaymentConfirm', { kind: 'prepaid', from: acc, to: phone, amount: amt.replace('$', '') })} />
      </ScrollView>

      <PickerModal visible={open} title={t('Choose account:')} options={accountOpts} selected={acc}
        onSelect={(v) => { setAcc(v); setOpen(false); }} onClose={() => setOpen(false)} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 16, paddingBottom: 32 },
  label0: { fontFamily: fonts.regular, fontSize: 8, color: colors.muted, marginBottom: 4 },
  box: { height: 40, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, paddingHorizontal: 12, backgroundColor: '#fff' },
  pick: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  text: { fontFamily: fonts.regular, fontSize: 11, color: colors.text },
  balance: { fontFamily: fonts.medium, fontSize: 8, color: colors.primary, marginTop: 6 },
  dirHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 16 },
  label: { fontFamily: fonts.regular, fontSize: 8, color: colors.muted, marginTop: 16, marginBottom: 8 },
  find: { fontFamily: fonts.medium, fontSize: 8, color: colors.primary, marginBottom: 8 },
  ben: { width: 68, height: 76, borderRadius: 8, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', gap: 6, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  benName: { fontFamily: fonts.regular, fontSize: 9, color: colors.text },
  chips: { flexDirection: 'row', gap: 10 },
  chip: { flex: 1, height: 44, borderRadius: 8, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  chipOn: { backgroundColor: colors.primary },
  chipText: { fontFamily: fonts.medium, fontSize: 10, color: colors.muted },
});
