import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import { useLang } from '../i18n';
import { colors, fonts } from '../theme';
import { ScreenProps } from '../navigation/types';

export default function CardDetailScreen({ navigation }: ScreenProps<'CardDetail'>) {
  const { t } = useLang();
  const [confirm, setConfirm] = useState(false);
  const rows = [
    ['Name', 'Push Puttichai'], ['Card number', '**** **** 9018'], ['Valid from', '10/15'],
    ['Good thru', '10/20'], ['Available balance', '$10,000'],
  ];
  return (
    <View style={styles.root}>
      <Header light title={t('Card')} onBack={navigation.goBack} />
      <View style={{ paddingHorizontal: 20 }}>
        {rows.map(([k, v]) => (
          <View key={k} style={styles.row}>
            <Text style={styles.label}>{t(k)}</Text>
            <Text style={styles.value}>{v}</Text>
          </View>
        ))}
      </View>
      <Pressable style={styles.del} onPress={() => setConfirm(true)}>
        <Text style={styles.delText}>{t('Delete card')}</Text>
      </Pressable>

      <Modal visible={confirm} transparent animationType="fade" onRequestClose={() => setConfirm(false)}>
        <View style={styles.backdrop}>
          <View style={styles.dialog}>
            <Text style={styles.dTitle}>{t('Delete card?')}</Text>
            <View style={styles.dBtns}>
              <Pressable style={styles.dBtn} onPress={() => setConfirm(false)}><Text style={styles.dCancel}>{t('Cancel')}</Text></Pressable>
              <Pressable style={styles.dBtn} onPress={() => { setConfirm(false); navigation.goBack(); }}><Text style={styles.dDelete}>{t('Delete')}</Text></Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 40, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  label: { fontFamily: fonts.regular, fontSize: 10, color: colors.muted },
  value: { fontFamily: fonts.medium, fontSize: 10, color: colors.primary },
  del: { position: 'absolute', bottom: 60, alignSelf: 'center', padding: 12 },
  delText: { fontFamily: fonts.medium, fontSize: 11, color: colors.danger },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center' },
  dialog: { width: 270, borderRadius: 14, backgroundColor: '#fff', paddingTop: 20, alignItems: 'center' },
  dTitle: { fontFamily: fonts.medium, fontSize: 13, color: colors.text, marginBottom: 18 },
  dBtns: { flexDirection: 'row', width: '100%', borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border },
  dBtn: { flex: 1, height: 44, alignItems: 'center', justifyContent: 'center' },
  dCancel: { fontFamily: fonts.medium, fontSize: 13, color: colors.primary },
  dDelete: { fontFamily: fonts.medium, fontSize: 13, color: colors.danger },
});
