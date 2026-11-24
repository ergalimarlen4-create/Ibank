import { StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import { useLang } from '../i18n';
import { colors, fonts } from '../theme';
import { ScreenProps } from '../navigation/types';

const langNames = { kk: 'Қазақша', ru: 'Русский', en: 'English' } as const;

export default function AppInfoScreen({ navigation }: ScreenProps<'AppInfo'>) {
  const { t, lang } = useLang();
  const rows = [
    [t('Date of manufacture'), 'Dec 2019'],
    [t('Version'), '9.0.2'],
    [t('Language'), langNames[lang]],
  ];
  return (
    <View style={styles.root}>
      <Header light title={t('App information')} onBack={navigation.goBack} />
      <View style={styles.body}>
        <Text style={styles.title}>Ibank E-mobile Banking</Text>
        {rows.map(([k, v]) => (
          <View key={k} style={styles.row}>
            <Text style={styles.label}>{k}</Text>
            <Text style={styles.value}>{v}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  body: { paddingHorizontal: 20, paddingTop: 20 },
  title: { fontFamily: fonts.semibold, fontSize: 14, color: colors.text, marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 44, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  label: { fontFamily: fonts.regular, fontSize: 11, color: colors.text },
  value: { fontFamily: fonts.medium, fontSize: 11, color: colors.primary },
});
