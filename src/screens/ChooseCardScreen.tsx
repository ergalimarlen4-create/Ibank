import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import BankCard from '../components/BankCard';
import { useLang } from '../i18n';
import { colors, fonts } from '../theme';
import { ScreenProps } from '../navigation/types';

export default function ChooseCardScreen({ navigation }: ScreenProps<'ChooseCard'>) {
  const { t } = useLang();
  return (
    <View style={styles.root}>
      <Header light title={t('Choose card')} onBack={navigation.goBack} />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <BankCard onPress={navigation.goBack} />
        <BankCard variant="orange" onPress={navigation.goBack} />
        <Pressable style={styles.add}>
          <Text style={styles.addText}>{t('Add new card')}</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  add: { height: 40, borderRadius: 6, borderWidth: 1, borderStyle: 'dashed', borderColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  addText: { fontFamily: fonts.regular, fontSize: 9, color: colors.primary },
});
