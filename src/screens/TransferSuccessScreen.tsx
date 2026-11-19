import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

export default function TransferSuccessScreen({ route, navigation }: any) {
  const { amount = '$1,000', toName = 'Amanda' } = route?.params || {};

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#1E1E1E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transfer</Text>
      </View>

      <View style={styles.content}>
        {/* Illustration Placeholder */}
        <View style={styles.illustrationBox}>
          <View style={styles.circleBg}>
            <FontAwesome5 name="wallet" size={54} color="#3629B7" />
            <View style={styles.coinBadge}>
              <Text style={styles.coinText}>$</Text>
            </View>
          </View>
        </View>

        <Text style={styles.successTitle}>Transfer successful!</Text>
        <Text style={styles.successSub}>
          You have successfully transferred{'\n'}
          <Text style={styles.highlightAmount}>{amount}</Text> to{' '}
          <Text style={styles.highlightName}>{toName}!</Text>
        </Text>

        <TouchableOpacity
          style={styles.confirmBtn}
          onPress={() => navigation.popToTop()}
        >
          <Text style={styles.confirmBtnText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15 },
  backBtn: { marginRight: 12 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#1E1E1E' },
  content: { flex: 1, alignItems: 'center', paddingHorizontal: 24, paddingTop: 40 },
  illustrationBox: { marginBottom: 32, alignItems: 'center', justifyContent: 'center' },
  circleBg: {
    width: 180,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#F2F1F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinBadge: {
    position: 'absolute',
    top: 24,
    right: 45,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFAF2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinText: { color: '#FFF', fontWeight: '800', fontSize: 16 },
  successTitle: { fontSize: 20, fontWeight: '700', color: '#3629B7', marginBottom: 14 },
  successSub: {
    fontSize: 14,
    color: '#3C3C43',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
  },
  highlightAmount: { color: '#FF3B30', fontWeight: '700' },
  highlightName: { color: '#3629B7', fontWeight: '700' },
  confirmBtn: {
    width: '100%',
    height: 48,
    backgroundColor: '#3629B7',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});