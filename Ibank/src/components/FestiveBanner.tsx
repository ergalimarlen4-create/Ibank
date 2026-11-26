import { StyleSheet, Text, View } from 'react-native';
import KazakhFlag from './KazakhFlag';
import Ornament from './Ornament';
import { KZ_BLUE, KZ_GOLD, useFestive } from '../data/festive';
import { useLang } from '../i18n';
import { fonts } from '../theme';

// Праздничный баннер на Home
export default function FestiveBanner() {
  const { mode } = useFestive();
  const { t } = useLang();
  if (mode === 'newyear') {
    return (
      <View style={[styles.banner, { backgroundColor: '#B71C1C' }]}>
        <Text style={styles.emoji}>🎄</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{t('Happy New Year!')}</Text>
          <Text style={styles.sub}>{t('Wishing you happiness and peace')}</Text>
        </View>
        <Text style={styles.emoji}>🎁</Text>
      </View>
    );
  }
  if (mode === 'independence') {
    return (
      <View style={[styles.banner, { backgroundColor: KZ_BLUE, paddingBottom: 26, overflow: 'hidden' }]}>
        <View style={styles.flag}><KazakhFlag width={72} /></View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{t('December 16')}</Text>
          <Text style={styles.sub}>{t('Independence Day of Kazakhstan')}</Text>
        </View>
        <View style={styles.orn}><Ornament color={KZ_GOLD} height={14} /></View>
      </View>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  banner: { flexDirection: 'row', alignItems: 'center', gap: 12, borderRadius: 14, padding: 14, marginBottom: 14 },
  emoji: { fontSize: 28 },
  flag: { borderRadius: 4, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.6)' },
  title: { color: '#fff', fontFamily: fonts.semibold, fontSize: 14 },
  sub: { color: 'rgba(255,255,255,0.9)', fontFamily: fonts.regular, fontSize: 10, marginTop: 2 },
  orn: { position: 'absolute', left: 0, right: 0, bottom: 4 },
});
