import { useEffect, useRef, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Button from './Button';
import { useLang } from '../i18n';
import { colors, fonts, radius } from '../theme';

type Method = 'otp' | 'finger' | 'face';
const methods: { key: Method; label: string }[] = [
  { key: 'otp', label: 'OTP' },
  { key: 'finger', label: 'Fingerprint' },
  { key: 'face', label: 'Face ID' },
];

// Блок подтверждения: OTP / отпечаток / Face ID. Сообщает родителю, готово ли подтверждение.
export default function Verification({ onReady }: { onReady: (ready: boolean) => void }) {
  const { t } = useLang();
  const [method, setMethod] = useState<Method>('otp');
  const [otp, setOtp] = useState('');
  const [sent, setSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [scanning, setScanning] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const ready = method === 'otp' ? otp.length >= 4 : verified;
  useEffect(() => { onReady(ready); }, [ready]);

  const change = (m: Method) => {
    clearTimeout(timer.current);
    setMethod(m); setVerified(false); setScanning(false); setOtp(''); setSent(false);
  };
  const scan = () => {
    if (verified) return;
    setScanning(method === 'finger');
    timer.current = setTimeout(() => { setScanning(false); setVerified(true); }, 1500);
  };
  const cancel = () => { clearTimeout(timer.current); setScanning(false); };
  const iconColor = verified ? colors.primary : '#C9C5EF';

  return (
    <View>
      <View style={styles.chips}>
        {methods.map((m) => (
          <Pressable key={m.key} style={[styles.chip, method === m.key && styles.chipOn]} onPress={() => change(m.key)}>
            <Text style={[styles.chipText, method === m.key && { color: '#fff' }]}>{t(m.label)}</Text>
          </Pressable>
        ))}
      </View>

      {method === 'otp' ? (
        <View>
          <Text style={styles.label}>{t('Get OTP to verify transaction')}</Text>
          <View style={styles.otpRow}>
            <TextInput style={[styles.box, styles.otpInput]} placeholder={t('OTP')} placeholderTextColor={colors.muted}
              keyboardType="number-pad" maxLength={6} value={otp} onChangeText={setOtp} />
            <Button title={t('Get OTP')} style={styles.otpBtn} onPress={() => setSent(true)} />
          </View>
          {sent && <Text style={styles.sent}>{t('Code sent')}</Text>}
        </View>
      ) : (
        <View>
          <Text style={styles.label}>{t(method === 'finger' ? 'Use fingerprint to verify transaction' : 'Use Face ID to verify transaction')}</Text>
          <Pressable style={styles.bio} onPress={scan}>
            {method === 'finger'
              ? <Ionicons name="finger-print" size={72} color={iconColor} />
              : <MaterialCommunityIcons name="face-recognition" size={72} color={iconColor} />}
          </Pressable>
        </View>
      )}

      <Modal visible={scanning} transparent animationType="fade" onRequestClose={cancel}>
        <View style={styles.backdrop}>
          <View style={styles.dialog}>
            <Ionicons name="finger-print" size={36} color={colors.danger} />
            <Text style={styles.dTitle}>{t('Touch ID for Ibank')}</Text>
            <Text style={styles.dSub}>{t('Access to the application')}</Text>
            <Pressable style={styles.dCancel} onPress={cancel}><Text style={styles.dCancelText}>{t('Cancel')}</Text></Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  chips: { flexDirection: 'row', gap: 8, marginVertical: 8 },
  chip: { paddingHorizontal: 12, height: 28, borderRadius: 14, borderWidth: 1, borderColor: colors.border, justifyContent: 'center' },
  chipOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { fontFamily: fonts.regular, fontSize: 10, color: colors.muted },
  label: { fontFamily: fonts.regular, fontSize: 9, color: colors.muted, marginBottom: 6, marginTop: 4 },
  box: { height: 40, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, paddingHorizontal: 12, backgroundColor: '#fff' },
  otpRow: { flexDirection: 'row', gap: 8 },
  otpInput: { flex: 1, fontFamily: fonts.regular, fontSize: 11, color: colors.text },
  otpBtn: { width: 96, height: 40 },
  sent: { fontFamily: fonts.regular, fontSize: 9, color: colors.primary, marginTop: 6 },
  bio: { alignSelf: 'center', marginTop: 16, padding: 8 },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center' },
  dialog: { width: 270, borderRadius: 14, backgroundColor: '#fff', alignItems: 'center', paddingTop: 20 },
  dTitle: { fontFamily: fonts.semibold, fontSize: 13, color: colors.text, marginTop: 8 },
  dSub: { fontFamily: fonts.regular, fontSize: 11, color: colors.text, marginTop: 2, marginBottom: 16 },
  dCancel: { width: '100%', height: 44, alignItems: 'center', justifyContent: 'center', borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border },
  dCancelText: { fontFamily: fonts.medium, fontSize: 14, color: colors.primary },
});
