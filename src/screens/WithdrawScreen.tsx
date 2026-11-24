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
const amounts = ['$10', '$50', '$100', '$150', '$200', 'Other'];

export default function WithdrawScreen({ navigation }: ScreenProps<'Withdraw'>) {
  const { t } = useLang();
  const [acc, setAcc] = useState('');
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [amt, setAmt] = useState('');
  const [custom, setCustom] = useState('');
  const ok = acc && phone && (amt === 'Other' ? custom : amt);

  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header light title={t('Withdraw')} onBack={navigation.goBack} />
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
        {/* Замени на иллюстрацию из Figma */}
        <View style={styles.art}><Ionicons name="wallet" size={80} color={colors.primary} /></View>

        <Pressable style={[styles.box, styles.pick]} onPress={() => setOpen(true)}>
          <Text style={[styles.text, !acc && { color: colors.muted }]}>{acc || t('Choose account / card')}</Text>
          <Ionicons name="chevron-down" size={14} color={colors.muted} />
        </Pressable>
        {!!acc && <Text style={styles.balance}>{t('Available balance')} : 10,000$</Text>}

        <TextInput style={[styles.box, styles.text, { marginTop: 12 }]} placeholder={t('Phone number')} placeholderTextColor={colors.muted}
          keyboardType="phone-pad" value={phone} onChangeText={setPhone} />

        <Text style={styles.label}>{t('Choose amount')}</Text>
        <View style={styles.chips}>
          {amounts.map((a) => (
            <Pressable key={a} style={[styles.chip, amt === a && styles.chipOn]} onPress={() => setAmt(a)}>
              <Text style={[styles.chipText, amt === a && { color: '#fff' }]}>{a === 'Other' ? t('Other') : a}</Text>
            </Pressable>
          ))}
        </View>
        {amt === 'Other' && (
          <TextInput style={[styles.box, styles.text, { marginTop: 12 }]} placeholder={t('Amount')} placeholderTextColor={colors.muted}
            keyboardType="numeric" value={custom} onChangeText={setCustom} />
        )}

        <Button
          title={t('Verify')}
          disabled={!ok}
          style={{ marginTop: 28 }}
          onPress={() => navigation.navigate('PaymentConfirm', { kind: 'withdraw', from: acc, to: phone, amount: amt === 'Other' ? custom : amt.replace('$', '') })}
        />
      </ScrollView>

      <PickerModal visible={open} title={t('Choose account:')} options={accountOpts} selected={acc}
        onSelect={(v) => { setAcc(v); setOpen(false); }} onClose={() => setOpen(false)} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 16, paddingBottom: 32 },
  art: { alignSelf: 'center', width: 170, height: 170, borderRadius: 85, backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center', marginVertical: 24 },
  box: { height: 40, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, paddingHorizontal: 12, backgroundColor: '#fff' },
  pick: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  text: { fontFamily: fonts.regular, fontSize: 11, color: colors.text },
  balance: { fontFamily: fonts.medium, fontSize: 8, color: colors.primary, marginTop: 6 },
  label: { fontFamily: fonts.regular, fontSize: 8, color: colors.muted, marginTop: 18, marginBottom: 8 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chip: { width: '31%', height: 40, borderRadius: 8, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  chipOn: { backgroundColor: colors.primary },
  chipText: { fontFamily: fonts.medium, fontSize: 10, color: colors.muted },
});
