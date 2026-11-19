import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ConfirmScreen({ route, navigation }: any) {
  const {
    fromCard = '**** **** 6789',
    toName = 'Amanda',
    cardNumber = '0123456789',
    fee = '10$',
    content = 'From Jimy',
    amount = '$1000',
    bank,
  } = route?.params || {};

  const [verifyMethod, setVerifyMethod] = useState<'otp' | 'touchId' | 'faceId'>('otp');
  const [otp, setOtp] = useState('6789');
  const [isVerified, setIsVerified] = useState(true);
  const [showTouchModal, setShowTouchModal] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleGetOtp = () => {
    setOtp('6789');
    setIsVerified(true);
  };

  const handleBiometricVerify = () => {
    if (verifyMethod === 'touchId') {
      setShowTouchModal(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setShowTouchModal(false);
        setIsVerified(true);
      }, 1500);
    } else if (verifyMethod === 'faceId') {
      setIsVerified(true);
    }
  };

  const handleFinalConfirm = () => {
    if (!isVerified) return;
    navigation.navigate('TransferSuccessScreen', {
      amount,
      toName,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#1E1E1E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confirm</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.subTitle}>Confirm transaction information</Text>

        <Text style={styles.fieldLabel}>From</Text>
        <View style={styles.readOnlyBox}>
          <Text style={styles.readOnlyText}>{fromCard}</Text>
        </View>

        <Text style={styles.fieldLabel}>To</Text>
        <View style={styles.readOnlyBox}>
          <Text style={styles.readOnlyText}>{toName}</Text>
        </View>

        {bank && (
          <>
            <Text style={styles.fieldLabel}>Beneficiary bank</Text>
            <View style={styles.readOnlyBox}>
              <Text style={styles.readOnlyText}>{bank}</Text>
            </View>
          </>
        )}

        <Text style={styles.fieldLabel}>Card number</Text>
        <View style={styles.readOnlyBox}>
          <Text style={styles.readOnlyText}>{cardNumber}</Text>
        </View>

        <Text style={styles.fieldLabel}>Transaction fee</Text>
        <View style={styles.readOnlyBox}>
          <Text style={styles.readOnlyText}>{fee}</Text>
        </View>

        <Text style={styles.fieldLabel}>Content</Text>
        <View style={styles.readOnlyBox}>
          <Text style={styles.readOnlyText}>{content}</Text>
        </View>

        <Text style={styles.fieldLabel}>Amount</Text>
        <View style={styles.readOnlyBox}>
          <Text style={styles.readOnlyText}>{amount}</Text>
        </View>

        {/* Verification Method Switcher */}
        <View style={styles.methodSwitcher}>
          <TouchableOpacity onPress={() => setVerifyMethod('otp')}>
            <Text style={[styles.switchTab, verifyMethod === 'otp' && styles.switchTabActive]}>OTP</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setVerifyMethod('touchId')}>
            <Text style={[styles.switchTab, verifyMethod === 'touchId' && styles.switchTabActive]}>Touch ID</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setVerifyMethod('faceId')}>
            <Text style={[styles.switchTab, verifyMethod === 'faceId' && styles.switchTabActive]}>Face ID</Text>
          </TouchableOpacity>
        </View>

        {/* 1. OTP Verification */}
        {verifyMethod === 'otp' && (
          <>
            <Text style={styles.fieldLabel}>Get OTP to verify transaction</Text>
            <View style={styles.otpRow}>
              <TextInput
                style={styles.otpInput}
                placeholder="OTP"
                placeholderTextColor="#B0B0B0"
                value={otp}
                onChangeText={(val) => {
                  setOtp(val);
                  setIsVerified(true);
                }}
              />
              <TouchableOpacity style={styles.getOtpBtn} onPress={handleGetOtp}>
                <Text style={styles.getOtpText}>Get OTP</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {/* 2. Touch ID Verification */}
        {verifyMethod === 'touchId' && (
          <View style={styles.biometricBox}>
            <Text style={styles.fieldLabel}>Use Touch ID to verify transaction</Text>
            <TouchableOpacity onPress={handleBiometricVerify} style={styles.bioIconWrapper}>
              <Ionicons
                name="finger-print"
                size={64}
                color={isVerified ? '#3629B7' : '#A59EE2'}
              />
            </TouchableOpacity>
          </View>
        )}

        {/* 3. Face ID Verification */}
        {verifyMethod === 'faceId' && (
          <View style={styles.biometricBox}>
            <Text style={styles.fieldLabel}>Use Face ID to verify transaction</Text>
            <TouchableOpacity onPress={handleBiometricVerify} style={styles.bioIconWrapper}>
              <Ionicons
                name="scan-outline"
                size={64}
                color={isVerified ? '#3629B7' : '#C7C7CC'}
              />
            </TouchableOpacity>
          </View>
        )}

        {/* Confirm Button */}
        <TouchableOpacity
          style={[styles.confirmBtn, isVerified ? styles.confirmBtnActive : styles.confirmBtnDisabled]}
          onPress={handleFinalConfirm}
          disabled={!isVerified}
        >
          <Text style={styles.confirmBtnText}>Confirm</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Touch ID Modal */}
      <Modal visible={showTouchModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.touchDialog}>
            <Ionicons name="finger-print" size={44} color="#FF3B30" style={{ marginBottom: 10 }} />
            <Text style={styles.dialogTitle}>Touch ID for Ibank</Text>
            <Text style={styles.dialogSub}>Access to the application</Text>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => {
                if (timerRef.current) clearTimeout(timerRef.current);
                setShowTouchModal(false);
              }}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15 },
  backBtn: { marginRight: 12 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#1E1E1E' },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  subTitle: { fontSize: 12, color: '#8E8E93', marginBottom: 14 },
  fieldLabel: { fontSize: 12, color: '#8E8E93', fontWeight: '600', marginBottom: 6, marginTop: 10 },
  readOnlyBox: {
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 14,
    height: 44,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  readOnlyText: { fontSize: 14, fontWeight: '600', color: '#1E1E1E' },
  methodSwitcher: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 18,
    paddingVertical: 6,
    backgroundColor: '#F8F8FA',
    borderRadius: 10,
  },
  switchTab: { fontSize: 12, color: '#8E8E93', fontWeight: '600' },
  switchTabActive: { color: '#3629B7', textDecorationLine: 'underline' },
  otpRow: { flexDirection: 'row', gap: 12, alignItems: 'center', marginTop: 4 },
  otpInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 14,
    height: 46,
    paddingHorizontal: 16,
    fontSize: 14,
    fontWeight: '600',
  },
  getOtpBtn: {
    backgroundColor: '#3629B7',
    height: 46,
    paddingHorizontal: 22,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  getOtpText: { color: '#FFF', fontWeight: '600', fontSize: 14 },
  biometricBox: { alignItems: 'center', marginVertical: 14 },
  bioIconWrapper: { padding: 14 },
  confirmBtn: {
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  confirmBtnDisabled: { backgroundColor: '#F2F1F9' },
  confirmBtnActive: { backgroundColor: '#3629B7' },
  confirmBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchDialog: {
    width: 270,
    backgroundColor: '#F8F8F8',
    borderRadius: 16,
    paddingTop: 20,
    alignItems: 'center',
  },
  dialogTitle: { fontSize: 16, fontWeight: '700', color: '#000' },
  dialogSub: { fontSize: 13, color: '#3C3C43', marginTop: 4, marginBottom: 16 },
  cancelBtn: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#D1D1D6',
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelText: { color: '#007AFF', fontSize: 16, fontWeight: '600' },
});