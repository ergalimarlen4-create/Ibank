import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import BottomTabBar from '../components/BottomTabBar';
import { useLang } from '../i18n';
import { colors, fonts, radius } from '../theme';
import { RootStackParamList, ScreenProps } from '../navigation/types';

const rows: { label: string; to?: keyof RootStackParamList; value?: string }[] = [
  { label: 'Password', to: 'SettingPassword' },
  { label: 'Touch ID' },
  { label: 'Languages', to: 'Language' },
  { label: 'App information', to: 'AppInfo' },
  { label: 'Customer care', value: '19006983' },
];

export default function SettingScreen({ navigation }: ScreenProps<'Setting'>) {
  const { t } = useLang();
  return (
    <View style={styles.root}>
      <Header title={t('Setting')} onBack={navigation.goBack} />
      <View style={styles.sheet}>
        <View style={styles.avatarWrap}>
          <View style={styles.avatar}><Ionicons name="person" size={34} color={colors.primary} /></View>
        </View>
        <Text style={styles.name}>Push Puttichai</Text>
        <View style={{ paddingHorizontal: 20 }}>
          {rows.map((r) => (
            <Pressable key={r.label} style={styles.row} onPress={() => r.to && navigation.navigate(r.to as any)}>
              <Text style={styles.label}>{t(r.label)}</Text>
              {r.value ? <Text style={styles.value}>{r.value}</Text> : <Ionicons name="chevron-forward" size={14} color={colors.border} />}
            </Pressable>
          ))}
        </View>
      </View>
      <BottomTabBar active="settings" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.primary },
  sheet: { flex: 1, marginTop: 44, backgroundColor: '#fff', borderTopLeftRadius: radius.lg, borderTopRightRadius: radius.lg },
  avatarWrap: { position: 'absolute', top: -36, left: 0, right: 0, alignItems: 'center' },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: colors.primaryLight, borderWidth: 3, borderColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  name: { textAlign: 'center', fontFamily: fonts.medium, fontSize: 11, color: colors.primary, marginTop: 48, marginBottom: 20 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 46, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  label: { fontFamily: fonts.regular, fontSize: 11, color: colors.text },
  value: { fontFamily: fonts.regular, fontSize: 8, color: colors.muted },
});
