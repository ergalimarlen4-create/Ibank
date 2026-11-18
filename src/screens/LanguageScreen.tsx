import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { useLang } from '../i18n';
import { colors, fonts } from '../theme';
import { ScreenProps } from '../navigation/types';

const langs = [
  { code: 'kk', flag: '🇰🇿', name: 'Қазақша' },
  { code: 'ru', flag: '🇷🇺', name: 'Русский' },
  { code: 'en', flag: '🇬🇧', name: 'English' },
] as const;

export default function LanguageScreen({ navigation }: ScreenProps<'Language'>) {
  const { lang, setLang, t } = useLang();
  return (
    <View style={styles.root}>
      <Header light title={t('Language')} onBack={navigation.goBack} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
        {langs.map((l) => {
          const on = l.code === lang;
          return (
            <Pressable key={l.code} style={styles.row} onPress={() => setLang(l.code)}>
              <Text style={styles.flag}>{l.flag}</Text>
              <Text style={[styles.name, on && styles.nameOn]}>{l.name}</Text>
              {on && <Ionicons name="checkmark" size={18} color={colors.primary} />}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  row: { flexDirection: 'row', alignItems: 'center', height: 56, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  flag: { fontSize: 22, width: 40 },
  name: { flex: 1, fontFamily: fonts.regular, fontSize: 12, color: colors.muted },
  nameOn: { fontFamily: fonts.medium, color: colors.text },
});
