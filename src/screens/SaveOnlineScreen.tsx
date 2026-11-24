import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { useLang } from '../i18n';
import { colors, fonts } from '../theme';
import { ScreenProps } from '../navigation/types';

export default function SaveOnlineScreen({ navigation }: ScreenProps<'SaveOnline'>) {
  const { t } = useLang();
  const items = [
    { title: 'Add', sub: 'Add new save online account', icon: 'add-circle', color: colors.primary, go: () => navigation.navigate('SaveOnlineAdd') },
    { title: 'Management', sub: 'Manage your save online account', icon: 'people', color: colors.warning, go: () => navigation.navigate('SaveManagement') },
  ] as const;
  return (
    <View style={styles.root}>
      <Header light title={t('Save online')} onBack={navigation.goBack} />
      <View style={styles.list}>
        {items.map((it) => (
          <Pressable key={it.title} style={styles.card} onPress={it.go}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{t(it.title)}</Text>
              <Text style={styles.sub}>{t(it.sub)}</Text>
            </View>
            {/* Замени на иллюстрацию из Figma */}
            <View style={[styles.art, { backgroundColor: it.color + '22' }]}><Ionicons name={it.icon} size={28} color={it.color} /></View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.screen },
  list: { padding: 16, gap: 12 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, padding: 16, height: 74, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  title: { fontFamily: fonts.semibold, fontSize: 11, color: colors.text },
  sub: { fontFamily: fonts.regular, fontSize: 8, color: colors.muted, marginTop: 5 },
  art: { width: 50, height: 50, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
});
