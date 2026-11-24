import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import PurchaseList from '../components/PurchaseList';
import Verification from '../components/Verification';
import PickerModal from '../components/PickerModal';
import { useLang } from '../i18n';
import { colors, fonts, radius } from '../theme';
import { ScreenProps } from '../navigation/types';

const accountOpts = ['VISA **** **** **** 1234', '1900 8988 5456', '1900 8112 5222', '4411 0000 1234'];

export default function CreditPayScreen({ navigation }: ScreenProps<'CreditPay'>) {
  const { t } = useLang();
  const [acc, setAcc] = useState('');
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header light title={t('Credit card')} onBack={navigation.goBack} />
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom: 32 }}>
        <Card><PurchaseList /></Card>
        <View style={styles.pad}>
          <Pressable style={[styles.box, styles.pick]} onPress={() => setOpen(true)}>
            <Text style={[styles.text, !acc && { color: colors.muted }]}>{acc || t('Choose account / card')}</Text>
            <Ionicons name="chevron-down" size={14} color={colors.muted} />
          </Pressable>
          <Verification onReady={setReady} />
          <Button title={t('Pay')} disabled={!acc || !ready} style={{ marginTop: 24 }} onPress={() => navigation.replace('PaymentSuccess', { kind: 'credit' })} />
        </View>
      </ScrollView>
      <PickerModal visible={open} title={t('Choose account:')} options={accountOpts} selected={acc}
        onSelect={(v) => { setAcc(v); setOpen(false); }} onClose={() => setOpen(false)} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  pad: { padding: 16, paddingTop: 20 },
  box: { height: 40, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, paddingHorizontal: 12, backgroundColor: '#fff', marginBottom: 8 },
  pick: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  text: { fontFamily: fonts.regular, fontSize: 11, color: colors.text },
});
