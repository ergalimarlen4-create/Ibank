import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import KazakhFlag from '../components/KazakhFlag';
import { FestiveMode, useFestive } from '../data/festive';
import { useLang } from '../i18n';
import { colors, fonts } from '../theme';
import { ScreenProps } from '../navigation/types';

const options: { key: FestiveMode; title: string; sub: string }[] = [
  { key: 'off', title: 'Off', sub: 'Default look of the app' },
  { key: 'newyear', title: 'New Year', sub: 'Snow and festive lights' },
  { key: 'independence', title: 'Independence Day', sub: 'Kazakh ornament and flag' },
];

export default function FestiveScreen({ navigation }: ScreenProps<'Festive'>) {
  const { t } = useLang();
  const { mode, setMode } = useFestive();
  return (
    <View style={styles.root}>
      <Header light title={t('Festive mode')} onBack={navigation.goBack} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.hint}>{t('Choose a festive look. You can turn it off any time.')}</Text>
        {options.map((o) => {
          const on = mode === o.key;
          return (
            <Pressable key={o.key} style={[styles.card, on && styles.cardOn]} onPress={() => setMode(o.key)}>
              <View style={styles.preview}>
                {o.key === 'off' && <Ionicons name="sunny-outline" size={26} color={colors.muted} />}
                {o.key === 'newyear' && <Text style={styles.emoji}>🎄</Text>}
                {o.key === 'independence' && <KazakhFlag width={52} />}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{t(o.title)}</Text>
                <Text style={styles.sub}>{t(o.sub)}</Text>
              </View>
              <View style={[styles.radio, on && styles.radioOn]}>{on && <Ionicons name="checkmark" size={14} color="#fff" />}</View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.screen },
  content: { padding: 16, gap: 12 },
  hint: { fontFamily: fonts.regular, fontSize: 11, color: colors.muted, marginBottom: 4 },
  card: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: '#fff', borderRadius: 12, padding: 14, borderWidth: 1.5, borderColor: 'transparent' },
  cardOn: { borderColor: colors.primary },
  preview: { width: 56, height: 40, alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 30 },
  title: { fontFamily: fonts.medium, fontSize: 13, color: colors.text },
  sub: { fontFamily: fonts.regular, fontSize: 10, color: colors.muted, marginTop: 3 },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 1.5, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  radioOn: { backgroundColor: colors.primary, borderColor: colors.primary },
});
