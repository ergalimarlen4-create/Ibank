import { useLang } from '../i18n';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts, radius } from '../theme';
import BottomTabBar from '../components/BottomTabBar';
import { ScreenProps } from '../navigation/types';

type Icon = keyof typeof Ionicons.glyphMap;

const actions: { label: string; icon: Icon; color: string }[] = [
  { label: 'Account\nand Card', icon: 'wallet', color: colors.primary },
  { label: 'Transfer', icon: 'swap-horizontal', color: colors.danger },
  { label: 'Withdraw', icon: 'arrow-down-circle', color: '#3B82F6' },
  { label: 'Mobile\nprepaid', icon: 'phone-portrait', color: colors.warning },
  { label: 'Pay the\nbill', icon: 'receipt', color: colors.success },
  { label: 'Save\nonline', icon: 'cash', color: colors.primary },
  { label: 'Credit\ncard', icon: 'card', color: '#F97316' },
  { label: 'Transaction\nreport', icon: 'document-text', color: colors.primary },
  { label: 'Beneficiary', icon: 'person-add', color: colors.danger },
];

export default function HomeScreen({ navigation }: ScreenProps<'Home'>) {
  const { t } = useLang();
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.root}>
      <View style={[styles.top, { paddingTop: insets.top + 12 }]}>
        <View style={styles.avatar}><Ionicons name="person" size={20} color={colors.primary} /></View>
        <Text style={styles.hi}>{t('Hi')}, Push Puttichai</Text>
        <Ionicons name="notifications" size={20} color="#fff" />
      </View>

      <ScrollView style={styles.sheet} contentContainerStyle={{ padding: 16 }}>
        <View style={styles.card}>
          <View style={styles.cardCircle} />
          <Text style={styles.holder}>John Smith</Text>
          <Text style={styles.cardType}>Amazon Platinium</Text>
          <Text style={styles.number}>4756   ••••  ••••   9018</Text>
          <View style={styles.cardBottom}>
            <Text style={styles.balance}>$3.469.52</Text>
            <Text style={styles.visa}>VISA</Text>
          </View>
        </View>

        <View style={styles.grid}>
          {actions.map((a) => (
            <Pressable
              key={a.label}
              style={styles.tile}
              onPress={() => a.label === 'Transfer' && navigation.navigate('Transfer')}
            >
              <Ionicons name={a.icon} size={26} color={a.color} />
              <Text style={styles.tileText}>{t(a.label)}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <BottomTabBar active="home" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.primary },
  top: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 16, gap: 10 },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  hi: { flex: 1, color: '#fff', fontFamily: fonts.medium, fontSize: 12 },
  sheet: { flex: 1, backgroundColor: '#fff', borderTopLeftRadius: radius.lg, borderTopRightRadius: radius.lg },
  card: { height: 150, borderRadius: 16, backgroundColor: colors.card, padding: 16, overflow: 'hidden' },
  cardCircle: { position: 'absolute', right: -40, top: -50, width: 160, height: 160, borderRadius: 80, backgroundColor: colors.cardCircle, opacity: 0.8 },
  holder: { color: '#fff', fontFamily: fonts.regular, fontSize: 18 },
  cardType: { color: '#fff', fontFamily: fonts.regular, fontSize: 10, marginTop: 18 },
  number: { color: '#fff', fontFamily: fonts.regular, fontSize: 11, marginTop: 4 },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto' },
  balance: { color: '#fff', fontFamily: fonts.semibold, fontSize: 15 },
  visa: { color: '#fff', fontFamily: fonts.semibold, fontSize: 16, fontStyle: 'italic' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 20 },
  tile: { width: '31.5%', aspectRatio: 1, borderRadius: 8, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', gap: 8, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  tileText: { fontFamily: fonts.regular, fontSize: 8, color: colors.muted, textAlign: 'center' },
  tabs: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#fff', paddingTop: 10 },
  tabActive: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.primary, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  tabActiveText: { color: '#fff', fontFamily: fonts.medium, fontSize: 10 },
});
