import { useLang } from '../i18n';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts } from '../theme';
import type { RootStackParamList } from '../navigation/types';

type Tab = 'home' | 'search' | 'mail' | 'settings';
type Icon = keyof typeof Ionicons.glyphMap;

const tabs: { key: Tab; icon: string; label: string; to?: keyof RootStackParamList }[] = [
  { key: 'home', icon: 'home', label: 'Home', to: 'Home' },
  { key: 'search', icon: 'search', label: 'Search', to: 'Search' },
  { key: 'mail', icon: 'mail', label: 'Message', to: 'Messages' },
  { key: 'settings', icon: 'settings', label: 'Setting', to: 'Setting' },
];

export default function BottomTabBar({ active }: { active: Tab }) {
  const { t: tr } = useLang();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.bar, { paddingBottom: insets.bottom + 8 }]}>
      {tabs.map((t) => {
        const on = t.key === active;
        return (
          <Pressable
            key={t.key}
            style={on ? styles.on : styles.off}
            onPress={() => {
              if (on || !t.to) return;
              if (t.to === 'Home') nav.popToTop();
              else if (active === 'home') nav.navigate(t.to as any);
              else nav.replace(t.to as any);
            }}
          >
            <Ionicons name={(on ? t.icon : `${t.icon}-outline`) as Icon} size={on ? 16 : 22} color={on ? '#fff' : colors.muted} />
            {on && <Text style={styles.label}>{tr(t.label)}</Text>}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#fff', paddingTop: 10 },
  on: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.primary, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  off: { padding: 8 },
  label: { color: '#fff', fontFamily: fonts.medium, fontSize: 10 },
});
