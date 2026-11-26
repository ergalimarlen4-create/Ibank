import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Avatar from '../components/Avatar';
import BankCard from '../components/BankCard';
import BottomTabBar from '../components/BottomTabBar';
import FestiveBanner from '../components/FestiveBanner';
import FestiveHeader from '../components/FestiveHeader';
import { useProfile } from '../data/profile';
import { useLang } from '../i18n';
import { colors, fonts, radius } from '../theme';
import { ScreenProps } from '../navigation/types';

type Icon = keyof typeof Ionicons.glyphMap;

const actions: { label: string; icon: Icon; color: string }[] = [
  { label: 'Account\nand Card', icon: 'wallet', color: colors.primary },
  { label: 'Transfer', icon: 'swap-horizontal', color: colors.danger },
  { label: 'Withdraw', icon: 'arrow-down-circle', color: '#3B82F6' },
  { label: 'Mobile\nprepaid', icon: 'phone-portrait', color: '#F59E0B' },
  { label: 'Pay the\nbill', icon: 'receipt', color: '#10B981' },
  { label: 'Save\nonline', icon: 'cash', color: colors.primary },
  { label: 'Credit\ncard', icon: 'card', color: '#F97316' },
  { label: 'Transaction\nreport', icon: 'document-text', color: '#6366F1' },
  { label: 'Beneficiary', icon: 'person-add', color: colors.danger },
];

const routes: Record<string, string> = {
  'Account\nand Card': 'AccountCard',
  Transfer: 'Transfer',
  Withdraw: 'Withdraw',
  'Transaction\nreport': 'TransactionReport',
  'Mobile\nprepaid': 'MobilePrepaid',
  'Pay the\nbill': 'PayBill',
  'Save\nonline': 'SaveOnline',
  'Credit\ncard': 'CreditCard',
  Beneficiary: 'Directory',
};

export default function HomeScreen({ navigation }: ScreenProps<'Home'>) {
  const { t } = useLang();
  const insets = useSafeAreaInsets();
  const { profile } = useProfile();
  const edit = () => navigation.navigate('EditProfile');

  return (
    <View style={styles.root}>
      <View style={[styles.top, { paddingTop: insets.top + 12 }]}>
        <Pressable style={styles.user} onPress={edit}>
          <Avatar size={40} />
          <Text style={styles.hi} numberOfLines={1}>{t('Hi')}, {profile.name}</Text>
          <Ionicons name="create-outline" size={14} color="rgba(255,255,255,0.7)" />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Messages')} hitSlop={10}>
          <Ionicons name="notifications" size={22} color="#fff" />
        </Pressable>
        <FestiveHeader />
      </View>

      <ScrollView style={styles.sheet} contentContainerStyle={styles.content}>
        <FestiveBanner />
        <BankCard />
        <View style={styles.grid}>
          {actions.map((a) => (
            <Pressable
              key={a.label}
              style={({ pressed }) => [styles.tile, pressed && { opacity: 0.8 }]}
              onPress={() => routes[a.label] && navigation.navigate(routes[a.label] as any)}
            >
              <View style={[styles.iconWrap, { backgroundColor: a.color + '1A' }]}>
                <Ionicons name={a.icon} size={22} color={a.color} />
              </View>
              <Text style={styles.tileText} numberOfLines={2}>{t(a.label).replace('\n', ' ')}</Text>
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
  top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 16 },
  user: { flexDirection: 'row', alignItems: 'center', gap: 10, flexShrink: 1 },
  hi: { color: '#fff', fontFamily: fonts.medium, fontSize: 13, flexShrink: 1 },
  sheet: { flex: 1, backgroundColor: '#fff', borderTopLeftRadius: radius.lg, borderTopRightRadius: radius.lg },
  content: { padding: 16, paddingBottom: 24 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 18 },
  tile: {
    width: '31.5%', height: 92, borderRadius: 14, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', gap: 8, paddingHorizontal: 6,
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },
  iconWrap: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  tileText: { fontFamily: fonts.regular, fontSize: 10, color: colors.text, textAlign: 'center' },
});
