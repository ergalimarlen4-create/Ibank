import { StyleSheet, View } from 'react-native';
import Snow from './Snow';
import Ornament from './Ornament';
import { KZ_BLUE, KZ_GOLD, useFestive } from '../data/festive';

// Глобальное украшение поверх всех экранов
export default function FestiveOverlay() {
  const { mode } = useFestive();
  if (mode === 'newyear') return <Snow />;
  if (mode === 'independence') {
    return (
      <View pointerEvents="none" style={styles.top}>
        <Ornament color={KZ_GOLD} bg={KZ_BLUE} height={10} />
      </View>
    );
  }
  return null;
}

const styles = StyleSheet.create({ top: { position: 'absolute', top: 0, left: 0, right: 0 } });
