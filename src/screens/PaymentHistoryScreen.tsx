import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import { useLang } from '../i18n';
import { colors, fonts } from '../theme';
import { ScreenProps } from '../navigation/types';

const tabs = [
  { key: 'Electric', amount: 480 },
  { key: 'Water', amount: 120 },
  { key: 'Mobile', amount: 50 },
  { key: 'Internet', amount: 50 },
];
const months = [
  ['October', '30/10/2019', 'Unsuccessfully'], ['September', '30/09/2019', 'Successfully'], ['August', '30/08/2019', 'Successfully'],
  ['July', '30/07/2019', 'Successfully'], ['June', '30/06/2019', 'Successfully'], ['May', '30/05/2019', 'Successfully'],
];

export default function PaymentHistoryScreen({ navigation, route }: ScreenProps<'PaymentHistory'>) {
  const { t } = useLang();
  const [tab, setTab] = useState(route.params?.tab ?? 'Electric');
  const amount = tabs.find((x) => x.key === tab)?.amount ?? 0;
  return (
    <View style={styles.root}>
      <Header light title={t('Payment history')} onBack={navigation.goBack} />
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabs}>
          {tabs.map((x) => (
            <Pressable key={x.key} style={[styles.tab, tab === x.key && styles.tabOn]} onPress={() => setTab(x.key)}>
              <Text style={[styles.tabText, tab === x.key && { color: '#fff' }]}>{t(x.key)}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <ScrollView contentContainerStyle={styles.list}>
        {months.map(([m, date, status]) => (
          <Pressable key={m} style={styles.card} onPress={() => navigation.navigate('BillDetail', { kind: tab })}>
            <View style={styles.row}>
              <Text style={styles.month}>{t(m)}</Text>
              <Text style={styles.date}>{date}</Text>
            </View>
            <View style={[styles.row, { marginTop: 14 }]}>
              <Text style={styles.small}>{t('Status')}  <Text style={[styles.status, { color: status === 'Successfully' ? colors.primary : colors.danger }]}>{t(status)}</Text></Text>
              <Text style={styles.small}>{t('Amount')}  <Text style={styles.status}>${amount}</Text></Text>
            </View>
            <Text style={[styles.small, { marginTop: 8 }]}>{t('Company')}  <Text style={styles.status}>Capi Telecom</Text></Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.screen },
  tabs: { paddingHorizontal: 16, gap: 10, paddingBottom: 8 },
  tab: { paddingHorizontal: 22, height: 32, borderRadius: 8, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  tabOn: { backgroundColor: colors.primary },
  tabText: { fontFamily: fonts.regular, fontSize: 10, color: colors.text },
  list: { padding: 16, gap: 10 },
  card: { backgroundColor: '#fff', borderRadius: 10, padding: 14, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  month: { fontFamily: fonts.medium, fontSize: 11, color: colors.text },
  date: { fontFamily: fonts.regular, fontSize: 8, color: colors.muted },
  small: { fontFamily: fonts.regular, fontSize: 8, color: colors.muted },
  status: { fontFamily: fonts.medium, fontSize: 8, color: colors.primary },
});
