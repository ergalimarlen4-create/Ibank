import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Avatar from '../components/Avatar';
import Header from '../components/Header';
import BottomTabBar from '../components/BottomTabBar';
import { useProfile } from '../data/profile';
import { useLang } from '../i18n';
import { colors, fonts, radius } from '../theme';
import { RootStackParamList, ScreenProps } from '../navigation/types';

const rows: { label: string; to?: keyof RootStackParamList; value?: string }[] = [
  { label: 'Profile', to: 'EditProfile' },
  { label: 'Password', to: 'SettingPassword' },
  { label: 'Touch ID' },
  { label: 'Languages', to: 'Language' },
  { label: 'Festive mode', to: 'Festive' },
  { label: 'App information', to: 'AppInfo' },
  { label: 'Customer care', value: '19006983' },
];

export default function SettingScreen({ navigation }: ScreenProps<'Setting'>) {
  const { t } = useLang();
  const { profile } = useProfile();
  return (
    <View style={styles.root}>
      <Header title={t('Setting')} onBack={navigation.goBack} />
      <View style={styles.sheet}>
        <View style={styles.avatarWrap}>
          <View style={styles.avatarBorder}>
            <Avatar size={72} onPress={() => navigation.navigate('EditProfile')} />
          </View>
        </View>
        <Text style={styles.name}>{profile.name}</Text>
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
  avatarBorder: { borderRadius: 40, borderWidth: 3, borderColor: '#fff' },
  name: { textAlign: 'center', fontFamily: fonts.medium, fontSize: 13, color: colors.primary, marginTop: 48, marginBottom: 20 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 46, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  label: { fontFamily: fonts.regular, fontSize: 12, color: colors.text },
  value: { fontFamily: fonts.regular, fontSize: 10, color: colors.muted },
});
