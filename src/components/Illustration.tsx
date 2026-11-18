import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

// Заглушка иллюстрации. Позже заменишь на PNG/SVG из Figma.
export default function Illustration({ icon }: { icon: keyof typeof Ionicons.glyphMap }) {
  return (
    <View style={styles.wrap}>
      <View style={styles.circle}>
        <Ionicons name={icon} size={44} color={colors.primary} />
      </View>
      <View style={[styles.dot, { top: 18, left: 118, backgroundColor: colors.primary, width: 8, height: 8 }]} />
      <View style={[styles.dot, { top: 34, right: 70, backgroundColor: colors.danger, width: 18, height: 18 }]} />
      <View style={[styles.dot, { top: 64, left: 66, backgroundColor: colors.success, width: 6, height: 6 }]} />
      <View style={[styles.dot, { bottom: 24, left: 82, backgroundColor: colors.warning, width: 14, height: 14 }]} />
      <View style={[styles.dot, { bottom: 24, right: 96, backgroundColor: '#3B82F6', width: 7, height: 7 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { height: 170, alignItems: 'center', justifyContent: 'center', marginVertical: 16, width: 260, alignSelf: 'center' },
  circle: { width: 108, height: 108, borderRadius: 54, backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  dot: { position: 'absolute', borderRadius: 20 },
});
