import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import { useLang } from '../i18n';
import { colors, fonts } from '../theme';
import { ScreenProps } from '../navigation/types';

const accounts = ['1900 8988 5456', '1900 8112 5222', '4411 0000 1234'];

export default function SaveManagementScreen({ navigation }: ScreenProps<'SaveManagement'>) {
  const { t } = useLang();
  return (
    <View style={styles.root}>
      <Header light title={t('Management')} onBack={navigation.goBack} />
      <ScrollView contentContainerStyle={styles.list}>
        {accounts.map((a) => (
          <View key={a} style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.title}>{t('Account')}</Text>
              <Text style={styles.title}>{a}</Text>
            </View>
            {[['From', '02/11/2019'], ['To', '02/11/2020'], ['Time deposit', t('12 months')], ['Interest rate', '5%']].map(([k, v]) => (
              <View key={k} style={styles.row}>
                <Text style={styles.label}>{t(k)}</Text>
                <Text style={styles.value}>{v}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.screen },
  list: { padding: 16, gap: 12 },
  card: { backgroundColor: '#fff', borderRadius: 10, padding: 14, gap: 8, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  title: { fontFamily: fonts.medium, fontSize: 10, color: colors.text },
  label: { fontFamily: fonts.regular, fontSize: 8, color: colors.muted },
  value: { fontFamily: fonts.medium, fontSize: 8, color: colors.primary },
});
