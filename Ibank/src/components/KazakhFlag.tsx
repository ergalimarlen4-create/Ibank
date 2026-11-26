import Svg, { Circle, G, Path, Polygon, Rect } from 'react-native-svg';
import { Motif } from './Ornament';
import { KZ_BLUE, KZ_GOLD } from '../data/festive';

const CX = 164, CY = 52;
const rays = Array.from({ length: 32 }, (_, k) => {
  const a = (k * 360) / 32 * (Math.PI / 180);
  const w = 3.4 * (Math.PI / 180);
  const p = (r: number, ang: number) => `${(CX + r * Math.sin(ang)).toFixed(2)},${(CY - r * Math.cos(ang)).toFixed(2)}`;
  return `${p(20, a - w)} ${p(34, a)} ${p(20, a + w)}`;
});

// Флаг Казахстана: небесно-голубое поле, солнце с 32 лучами, степной орёл, орнамент у древка (упрощённый рисунок)
export default function KazakhFlag({ width = 72 }: { width?: number }) {
  return (
    <Svg width={width} height={width / 2} viewBox="0 0 300 150">
      <Rect width="300" height="150" fill={KZ_BLUE} />
      <Circle cx={CX} cy={CY} r={18} fill={KZ_GOLD} />
      {rays.map((pts, i) => <Polygon key={i} points={pts} fill={KZ_GOLD} />)}
      <G transform="translate(14 0)">
        <Path
          d="M150 92 C130 86 105 90 85 104 C105 100 125 102 140 108 C135 112 128 116 120 124 C138 118 146 114 150 112 C154 114 162 118 180 124 C172 116 165 112 160 108 C175 102 195 100 215 104 C195 90 170 86 150 92 Z"
          fill={KZ_GOLD}
        />
      </G>
      {Array.from({ length: 8 }, (_, i) => (
        <G key={i} transform={`translate(20 ${4 + i * 18}) rotate(90)`}><Motif color={KZ_GOLD} /></G>
      ))}
    </Svg>
  );
}
