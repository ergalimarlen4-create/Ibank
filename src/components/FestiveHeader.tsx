import { StyleSheet, View } from 'react-native';
import Ornament from './Ornament';
import { KZ_GOLD, useFestive } from '../data/festive';

const bulbs = ['#EF4565', '#FEC50C', '#4CD7B0', '#4C9BF5'];

// Украшение нижней кромки шапки на Home: гирлянда или орнамент
export default function FestiveHeader() {
  const { mode } = useFestive();
  if (mode === 'independence') {
    return <View pointerEvents="none" style={styles.abs}><Ornament color={KZ_GOLD} height={12} /></View>;
  }
  if (mode === 'newyear') {
    return (
      <View pointerEvents="none" style={styles.garland}>
        <View style={styles.wire} />
        <View style={styles.row}>
          {Array.from({ length: 16 }, (_, i) => <View key={i} style={[styles.bulb, { backgroundColor: bulbs[i % bulbs.length] }]} />)}
        </View>
      </View>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  abs: { position: 'absolute', left: 0, right: 0, bottom: 2 },
  garland: { position: 'absolute', left: 0, right: 0, bottom: 2, height: 14 },
  wire: { position: 'absolute', top: 2, left: 0, right: 0, height: 1, backgroundColor: 'rgba(255,255,255,0.45)' },
  row: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 8 },
  bulb: { width: 7, height: 10, borderRadius: 4, marginTop: 3 },
});
