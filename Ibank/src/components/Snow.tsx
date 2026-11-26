import { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, Platform, StyleSheet, View, useWindowDimensions } from 'react-native';

function Flake({ height }: { height: number }) {
  const v = useRef(new Animated.Value(0)).current;
  const cfg = useMemo(() => ({
    left: Math.random() * 100, size: 5 + Math.random() * 7, dur: 7000 + Math.random() * 7000,
    delay: Math.random() * 7000, sway: 8 + Math.random() * 14, opacity: 0.55 + Math.random() * 0.45,
  }), []);

  useEffect(() => {
    const anim = Animated.sequence([
      Animated.delay(cfg.delay),
      Animated.loop(Animated.timing(v, { toValue: 1, duration: cfg.dur, easing: Easing.linear, useNativeDriver: Platform.OS !== 'web' })),
    ]);
    anim.start();
    return () => anim.stop();
  }, []);

  const translateY = v.interpolate({ inputRange: [0, 1], outputRange: [-20, height + 20] });
  const translateX = v.interpolate({ inputRange: [0, 0.25, 0.5, 0.75, 1], outputRange: [0, cfg.sway, 0, -cfg.sway, 0] });
  return (
    <Animated.View
      style={{
        position: 'absolute', top: 0, left: `${cfg.left}%`, width: cfg.size, height: cfg.size, borderRadius: cfg.size / 2,
        backgroundColor: '#E6F2FF', borderWidth: 1, borderColor: '#9CC9F5', opacity: cfg.opacity,
        transform: [{ translateX }, { translateY }],
      }}
    />
  );
}

// Падающий снег поверх всего приложения (касания не перехватывает)
export default function Snow({ count = 26 }: { count?: number }) {
  const { height } = useWindowDimensions();
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {Array.from({ length: count }, (_, i) => <Flake key={i} height={height} />)}
    </View>
  );
}
