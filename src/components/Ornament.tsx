import { View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';

// Один элемент казахского орнамента (қошқар мүйіз — рога барана), 16x12
export function Motif({ color }: { color: string }) {
  return (
    <>
      <Path d="M8 1 L12 6 L8 11 L4 6 Z" stroke={color} strokeWidth={1.2} fill="none" />
      <Path d="M4 6 C1 6 1 2 3.5 2" stroke={color} strokeWidth={1.2} fill="none" strokeLinecap="round" />
      <Path d="M12 6 C15 6 15 2 12.5 2" stroke={color} strokeWidth={1.2} fill="none" strokeLinecap="round" />
    </>
  );
}

// Полоса орнамента на всю ширину
export default function Ornament({ color, height = 12, bg }: { color: string; height?: number; bg?: string }) {
  const n = 42;
  return (
    <View style={{ height, width: '100%', overflow: 'hidden', backgroundColor: bg }}>
      <Svg width={n * 16} height={12} viewBox={`0 0 ${n * 16} 12`} style={{ position: 'absolute', left: 0, top: (height - 12) / 2 }}>
        {Array.from({ length: n }, (_, i) => (
          <G key={i} transform={`translate(${i * 16} 0)`}><Motif color={color} /></G>
        ))}
      </Svg>
    </View>
  );
}
