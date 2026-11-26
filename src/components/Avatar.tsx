import { Image, Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useProfile } from '../data/profile';
import { colors } from '../theme';

type Props = { size?: number; onPress?: () => void };

// Фото профиля или иконка по умолчанию
export default function Avatar({ size = 40, onPress }: Props) {
  const { profile } = useProfile();
  const radius = size / 2;
  const inner = profile.photo ? (
    <Image source={{ uri: profile.photo }} style={{ width: size, height: size, borderRadius: radius }} />
  ) : (
    <View style={{ width: size, height: size, borderRadius: radius, backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center' }}>
      <Ionicons name="person" size={size * 0.5} color={colors.primary} />
    </View>
  );
  return onPress ? <Pressable onPress={onPress}>{inner}</Pressable> : inner;
}
