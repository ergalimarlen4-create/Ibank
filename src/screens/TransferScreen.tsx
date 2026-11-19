import { useLang } from '../i18n';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import { colors, fonts, radius } from '../theme';
import { ScreenProps } from '../navigation/types';

const types = [
  { key: 'card', icon: 'card', label: 'Transfer via\ncard number' },
  { key: 'same', icon: 'person', label: 'Transfer to\nthe same bank' },
  { key: 'other', icon: 'business', label: 'Transfer to\nanother bank' },
] as const;
const people = ['Emma', 'Justin'];

function Field(props: React.ComponentProps<typeof TextInput>) {
  return <TextInput placeholderTextColor={colors.muted} {...props} style={styles.input} />;
}

export default function TransferScreen({ navigation }: ScreenProps<'Transfer'>) {
  const { t } = useLang();
  const [type, setType] = useState<string>('card');
  const [name, setName] = useState('');
  const [card, setCard] = useState('');
  const [amount, setAmount] = useState('');
  const [content, setContent] = useState('');
  const [save, setSave] = useState(false);

  const canGo = true;

  const handleConfirm = () => {
    (navigation as any).navigate('ConfirmScreen', {
      fromCard: 'VISA **** **** **** 1234',
      toName: name.trim() || 'Amanda',
      cardNumber: card.trim() || '0123456789',
      fee: '10$',
      content: content.trim() || 'From Jimy',
      amount: amount.trim() ? (amount.trim().startsWith('$') ? amount.trim() : `$${amount.trim()}`) : '$1000',
      bank: type === 'other' ? 'Other Bank' : undefined,
    });
  };

  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header light title={t('Transfer')} onBack={navigation.goBack} />
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom: 32 }}>
        <View style={styles.pad}>
          <Pressable style={styles.select}>
            <Text style={styles.selectText}>VISA **** **** **** 1234</Text>
            <Ionicons name="chevron-expand" size={16} color={colors.muted} />
          </Pressable>
          <Text style={styles.balance}>{t('Available balance')} : 10,000$</Text>

          <Text style={styles.section}>{t('Choose transaction')}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
            {types.map((tp) => {
              const on = tp.key === type;
              return (
                <Pressable key={tp.key} style={[styles.type, on && styles.typeOn]} onPress={() => setType(tp.key)}>
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
            {people.map((p) => (
              <Pressable key={p} style={styles.ben} onPress={() => setName(p)}>
                <View style={styles.avatar}><Ionicons name="person" size={20} color={colors.primary} /></View>
                <Text style={styles.benName}>{p}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <Card>
          <View style={{ gap: 12 }}>
            <Field placeholder={t('Name')} value={name} onChangeText={setName} />
            <Field placeholder={t('Card number')} keyboardType="number-pad" value={card} onChangeText={setCard} />
            <Field placeholder={t('Amount')} keyboardType="numeric" value={amount} onChangeText={setAmount} />
            <Field placeholder={t('Content')} value={content} onChangeText={setContent} />
          </View>
          <Pressable style={styles.checkRow} onPress={() => setSave((s) => !s)}>
            <View style={[styles.box, save && { borderColor: colors.primary }]}>
              {save && <Ionicons name="checkmark" size={12} color={colors.primary} />}
            </View>
            <Text style={styles.checkText}>{t('Save to directory of beneficiary')}</Text>
          </Pressable>
          <Button title={t('Confirm')} disabled={!canGo} onPress={handleConfirm} style={{ marginTop: 20 }} />
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.screen },
  pad: { paddingHorizontal: 16 },
  select: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 40, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, paddingHorizontal: 12, backgroundColor: '#fff' },
  selectText: { fontFamily: fonts.regular, fontSize: 11, color: colors.text },
  balance: { fontFamily: fonts.medium, fontSize: 9, color: colors.primary, marginTop: 6 },
  section: { fontFamily: fonts.regular, fontSize: 9, color: colors.muted, marginTop: 18, marginBottom: 8 },
  type: { width: 84, height: 72, borderRadius: 8, backgroundColor: '#E9E9EE', padding: 8, justifyContent: 'space-between' },
  typeOn: { backgroundColor: colors.primary },
  typeText: { fontFamily: fonts.regular, fontSize: 8, color: colors.muted },
  benHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  find: { fontFamily: fonts.medium, fontSize: 9, color: colors.primary, marginBottom: 8 },
  ben: { width: 68, height: 76, borderRadius: 8, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', gap: 6 },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  benName: { fontFamily: fonts.regular, fontSize: 9, color: colors.text },
  input: { height: 40, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, paddingHorizontal: 12, fontFamily: fonts.regular, fontSize: 11, color: colors.text },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 14 },
  box: { width: 16, height: 16, borderRadius: 3, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  checkText: { fontFamily: fonts.regular, fontSize: 10, color: colors.muted },
});