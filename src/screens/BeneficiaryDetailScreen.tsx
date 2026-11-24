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

export default function BeneficiaryDetailScreen({ navigation, route }: ScreenProps<'BeneficiaryDetail'>) {
  const { t } = useLang();
  const { list, update } = useBeneficiaries();
  const b = list.find((x) => x.id === route.params.id);
  const [name, setName] = useState(b?.name ?? '');
  const [card, setCard] = useState(b?.card ?? '');
  const [bank, setBank] = useState(b?.bank ?? '');
  const [branch, setBranch] = useState(b?.branch ?? '');
  const [picker, setPicker] = useState<'bank' | 'branch' | null>(null);
  const other = b?.group === 'other';

  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header title={t('Beneficiary')} onBack={navigation.goBack} />
      <View style={styles.sheet}>
        <View style={styles.avatarWrap}><View style={styles.avatar}><Ionicons name="person" size={38} color={colors.primary} /></View></View>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingTop: 48, paddingBottom: 32 }}>
          <Text style={styles.name}>{name}</Text>
          <Card>
            <View style={{ gap: 12 }}>
              {other && (
                <>
                  <View>
                    <Text style={styles.label}>{t('Choose bank')}</Text>
                    <Pressable style={[styles.box, styles.pick]} onPress={() => setPicker('bank')}><Text style={styles.text}>{bank}</Text><Ionicons name="chevron-expand" size={14} color={colors.muted} /></Pressable>
                  </View>
                  <View>
                    <Text style={styles.label}>{t('Choose branch')}</Text>
                    <Pressable style={[styles.box, styles.pick]} onPress={() => setPicker('branch')}><Text style={styles.text}>{branch}</Text><Ionicons name="chevron-expand" size={14} color={colors.muted} /></Pressable>
                  </View>
                </>
              )}
              <View>
                <Text style={styles.label}>{t('Transaction name')}</Text>
                <TextInput style={[styles.box, styles.text]} value={name} onChangeText={setName} />
              </View>
              <View>
                <Text style={styles.label}>{t('Card number')}</Text>
                <TextInput style={[styles.box, styles.text]} keyboardType="number-pad" value={card} onChangeText={setCard} />
              </View>
            </View>
            <Button title={t('Confirm')} style={{ marginTop: 24 }} onPress={() => { if (b) update(b.id, { name, card, bank, branch }); navigation.goBack(); }} />
          </Card>
        </ScrollView>
      </View>
      <PickerModal visible={picker === 'bank'} title={t('Choose beneficiary bank')} options={banks} selected={bank} searchable
        onSelect={(v) => { setBank(v); setPicker(null); }} onClose={() => setPicker(null)} />
      <PickerModal visible={picker === 'branch'} title={t('Choose branch')} options={branches} selected={branch}
        onSelect={(v) => { setBranch(v); setPicker(null); }} onClose={() => setPicker(null)} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.primary },
  sheet: { flex: 1, marginTop: 44, backgroundColor: '#fff', borderTopLeftRadius: radius.lg, borderTopRightRadius: radius.lg },
  avatarWrap: { position: 'absolute', top: -40, left: 0, right: 0, alignItems: 'center', zIndex: 2 },
  avatar: { width: 84, height: 84, borderRadius: 42, backgroundColor: colors.primaryLight, borderWidth: 3, borderColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  name: { textAlign: 'center', fontFamily: fonts.medium, fontSize: 10, color: colors.primary, marginBottom: 12 },
  label: { fontFamily: fonts.regular, fontSize: 8, color: colors.muted, marginBottom: 4 },
  box: { height: 40, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, paddingHorizontal: 12, backgroundColor: '#fff' },
  pick: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  text: { fontFamily: fonts.regular, fontSize: 11, color: colors.text },
});
