import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import PickerModal from '../components/PickerModal';
import { banks, branches, useBeneficiaries } from '../data/beneficiaries';
import { useLang } from '../i18n';
import { colors, fonts, radius } from '../theme';
import { ScreenProps } from '../navigation/types';

const types = [
  { key: 'card', icon: 'card', label: 'Transfer via\ncard number' },
  { key: 'same', icon: 'person', label: 'Transfer to\nthe same bank' },
  { key: 'other', icon: 'business', label: 'Transfer to\nanother bank' },
] as const;

export default function AddBeneficiaryScreen({ navigation }: ScreenProps<'AddBeneficiary'>) {
  const { t } = useLang();
  const { add } = useBeneficiaries();
  const [type, setType] = useState<'card' | 'same' | 'other'>('other');
  const [bank, setBank] = useState('');
  const [branch, setBranch] = useState('');
  const [name, setName] = useState('');
  const [card, setCard] = useState('');
  const [picker, setPicker] = useState<'bank' | 'branch' | null>(null);
  const other = type === 'other';
  const ok = name && card && (!other || (bank && branch));

  const Pick = ({ label, value, onPress }: { label: string; value: string; onPress: () => void }) => (
    <View>
      {!!value && <Text style={styles.label}>{label}</Text>}
      <Pressable style={[styles.box, styles.pick]} onPress={onPress}>
        <Text style={[styles.text, !value && { color: colors.muted }]}>{value || label}</Text>
        <Ionicons name="chevron-expand" size={14} color={colors.muted} />
      </Pressable>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header light title={t('Add new')} onBack={navigation.goBack} />
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom: 32 }}>
        <View style={styles.avatarWrap}>
          <View style={styles.avatar}><Ionicons name="person" size={44} color="#fff" /></View>
          <View style={styles.badge}><Ionicons name="add" size={14} color="#fff" /></View>
        </View>
        <Text style={styles.name}>{name}</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10, paddingHorizontal: 16, marginTop: 16 }}>
          {types.map((tp) => {
            const on = tp.key === type;
            return (
              <Pressable key={tp.key} style={[styles.type, on && { backgroundColor: tp.key === 'other' ? colors.warning : colors.primary }]} onPress={() => setType(tp.key)}>
                <Ionicons name={tp.icon} size={20} color={on ? '#fff' : colors.muted} />
                <Text style={[styles.typeText, on && { color: '#fff' }]}>{t(tp.label)}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <Card>
          <View style={{ gap: 12 }}>
            {other && <Pick label={t('Choose bank')} value={bank} onPress={() => setPicker('bank')} />}
            {other && <Pick label={t('Choose branch')} value={branch} onPress={() => setPicker('branch')} />}
            <View>
              {!!name && <Text style={styles.label}>{t('Transaction name')}</Text>}
              <TextInput style={[styles.box, styles.text]} placeholder={t('Transaction name')} placeholderTextColor={colors.muted} value={name} onChangeText={setName} />
            </View>
            <View>
              {!!card && <Text style={styles.label}>{t('Card number')}</Text>}
              <TextInput style={[styles.box, styles.text]} placeholder={t('Card number')} placeholderTextColor={colors.muted} keyboardType="number-pad" value={card} onChangeText={setCard} />
            </View>
          </View>
          <Button title={t('Save to directory')} disabled={!ok} style={{ marginTop: 24 }}
            onPress={() => { add({ name, card, group: type, bank: other ? bank : undefined, branch: other ? branch : undefined }); navigation.goBack(); }} />
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
  root: { flex: 1, backgroundColor: '#fff' },
  avatarWrap: { alignSelf: 'center', marginTop: 4 },
  avatar: { width: 84, height: 84, borderRadius: 42, backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  badge: { position: 'absolute', right: 0, bottom: 0, width: 22, height: 22, borderRadius: 11, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#fff' },
  name: { textAlign: 'center', fontFamily: fonts.medium, fontSize: 10, color: colors.primary, marginTop: 8, minHeight: 16 },
  type: { width: 84, height: 72, borderRadius: 8, backgroundColor: '#E9E9EE', padding: 8, justifyContent: 'space-between' },
  typeText: { fontFamily: fonts.regular, fontSize: 8, color: colors.muted },
  label: { fontFamily: fonts.regular, fontSize: 8, color: colors.muted, marginBottom: 4 },
  box: { height: 40, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, paddingHorizontal: 12, backgroundColor: '#fff' },
  pick: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  text: { fontFamily: fonts.regular, fontSize: 11, color: colors.text },
});
