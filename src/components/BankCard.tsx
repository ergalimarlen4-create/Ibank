import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../theme';

type Props = { variant?: 'blue' | 'orange'; onPress?: () => void };

export default function BankCard({ variant = 'blue', onPress }: Props) {
  const orange = variant === 'orange';
  return (
    <Pressable onPress={onPress} style={[styles.card, { backgroundColor: orange ? '#F7B84B' : colors.card }]}>
      <View style={[styles.circle, { backgroundColor: orange ? '#F9C971' : colors.cardCircle }]} />
      <Text style={styles.holder}>John Smith</Text>
      <Text style={styles.type}>Amazon Platinium</Text>
      <Text style={styles.number}>4756   ••••  ••••   9018</Text>
      <View style={styles.bottom}>
        <Text style={styles.balance}>$3.469.52</Text>
        {orange ? <View style={styles.toggle}><View style={styles.knob} /></View> : <Text style={styles.visa}>VISA</Text>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { height: 140, borderRadius: 16, padding: 16, overflow: 'hidden' },
  circle: { position: 'absolute', right: -40, top: -50, width: 150, height: 150, borderRadius: 75, opacity: 0.8 },
  holder: { color: '#fff', fontFamily: fonts.regular, fontSize: 17 },
  type: { color: '#fff', fontFamily: fonts.regular, fontSize: 9, marginTop: 14 },
  number: { color: '#fff', fontFamily: fonts.regular, fontSize: 10, marginTop: 4 },
  bottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto' },
  balance: { color: '#fff', fontFamily: fonts.semibold, fontSize: 14 },
  visa: { color: '#fff', fontFamily: fonts.semibold, fontSize: 16, fontStyle: 'italic' },
  toggle: { width: 34, height: 18, borderRadius: 9, backgroundColor: '#FDE4B0', justifyContent: 'center', alignItems: 'flex-end', paddingHorizontal: 2 },
  knob: { width: 14, height: 14, borderRadius: 7, backgroundColor: '#fff' },
});
