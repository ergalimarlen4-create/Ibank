import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, radius } from '../theme';

type Props = TextInputProps & { password?: boolean };

export default function Input({ password, style, ...rest }: Props) {
  const [hidden, setHidden] = useState(true);
  return (
    <View style={styles.wrap}>
      <TextInput
        placeholderTextColor={colors.muted}
        autoCapitalize="none"
        {...rest}
        secureTextEntry={password && hidden}
        style={[styles.input, style]}
      />
      {password && (
        <Pressable onPress={() => setHidden((h) => !h)} hitSlop={10}>
          <Ionicons name={hidden ? 'eye-outline' : 'eye-off-outline'} size={18} color={colors.muted} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  input: { flex: 1, fontFamily: fonts.regular, fontSize: 13, color: colors.text },
});
