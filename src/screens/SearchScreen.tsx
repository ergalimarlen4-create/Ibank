import { useLang } from '../i18n';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import BottomTabBar from '../components/BottomTabBar';
import { colors, fonts } from '../theme';
import { ScreenProps } from '../navigation/types';

const items = [
  { title: 'Branch', sub: 'Search for branch', icon: 'business', color: colors.primary, to: 'SearchBranch' },
  { title: 'Interest rate', sub: 'Search for interest rate', icon: 'trending-up', color: colors.success, to: 'InterestRate' },
  { title: 'Exchange rate', sub: 'Search for exchange rate', icon: 'cash', color: colors.warning, to: 'ExchangeRate' },
  { title: 'Exchange', sub: 'Exchange amount of money', icon: 'swap-horizontal', color: colors.danger, to: 'Exchange' },
] as const;

export default function SearchScreen({ navigation }: ScreenProps<'Search'>) {
  const { t } = useLang();
  return (
    <View style={styles.root}>
      <Header light title={t('Search')} onBack={navigation.goBack} />
      <ScrollView contentContainerStyle={styles.list}>
        {items.map((it) => (
          <Pressable key={it.title} style={styles.card} onPress={() => navigation.navigate(it.to)}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{t(it.title)}</Text>
              <Text style={styles.sub}>{t(it.sub)}</Text>
            </View>
            {/* Замени на иллюстрацию из Figma */}
            <View style={[styles.art, { backgroundColor: it.color + '22' }]}>
              <Ionicons name={it.icon} size={32} color={it.color} />
            </View>
          </Pressable>
        ))}
      </ScrollView>
      <BottomTabBar active="search" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.screen },
  list: { padding: 16, gap: 12 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, padding: 16, height: 82, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  title: { fontFamily: fonts.semibold, fontSize: 12, color: colors.text },
  sub: { fontFamily: fonts.regular, fontSize: 9, color: colors.muted, marginTop: 6 },
  art: { width: 56, height: 56, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
});
