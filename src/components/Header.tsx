import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts } from '../theme';

type Props = { title?: string; onBack?: () => void; light?: boolean };

// light = true -> белый фон (Forgot/Change password), иначе фиолетовый
export default function Header({ title, onBack, light }: Props) {
  const insets = useSafeAreaInsets();
  const fg = light ? colors.text : '#fff';
  return (
    <View style={[styles.wrap, { paddingTop: insets.top + 12 }, !light && styles.purple]}>
      {onBack && (
        <Pressable onPress={onBack} hitSlop={12}>
          <Ionicons name="chevron-back" size={20} color={fg} />
        </Pressable>
      )}
      {title && <Text style={[styles.title, { color: fg }]}>{title}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 20, paddingBottom: 16 },
  purple: { backgroundColor: colors.primary },
  title: { fontFamily: fonts.medium, fontSize: 16 },
});
