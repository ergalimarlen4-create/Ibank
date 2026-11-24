import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import BottomTabBar from '../components/BottomTabBar';
import { threads } from '../data/messages';
import { useLang } from '../i18n';
import { colors, fonts } from '../theme';
import { ScreenProps } from '../navigation/types';

export default function MessagesScreen({ navigation }: ScreenProps<'Messages'>) {
  const { t } = useLang();
  return (
    <View style={styles.root}>
      <Header light title={t('Message')} onBack={navigation.goBack} />
      <ScrollView contentContainerStyle={styles.list}>
        {threads.map((th) => (
          <Pressable key={th.id} style={styles.card} onPress={() => navigation.navigate('Chat', { id: th.id })}>
            <View style={[styles.icon, { backgroundColor: th.color }]}>
              <Ionicons name={th.icon} size={18} color="#fff" />
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.row}>
                <Text style={styles.title}>{t(th.title)}</Text>
                <Text style={styles.time}>{t(th.time)}</Text>
              </View>
              <Text style={styles.preview} numberOfLines={1}>{th.preview}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
      <BottomTabBar active="mail" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.screen },
  list: { padding: 16, gap: 10 },
  card: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#fff', borderRadius: 10, padding: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  icon: { width: 36, height: 36, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  title: { fontFamily: fonts.medium, fontSize: 11, color: colors.text },
  time: { fontFamily: fonts.regular, fontSize: 8, color: colors.muted },
  preview: { fontFamily: fonts.regular, fontSize: 9, color: colors.muted, marginTop: 4 },
});
