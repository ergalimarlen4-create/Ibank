import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLang } from '../i18n';
import { colors, fonts, radius } from '../theme';

type Props = {
  visible: boolean;
  title: string;
  options: string[];
  selected: string;
  onSelect: (v: string) => void;
  onClose: () => void;
  searchable?: boolean;
};

export default function PickerModal({ visible, title, options, selected, onSelect, onClose, searchable }: Props) {
  const { t } = useLang();
  const [q, setQ] = useState('');
  const list = options.filter((o) => o.toLowerCase().includes(q.toLowerCase()));
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          <Pressable style={styles.close} onPress={onClose} hitSlop={10}>
            <Ionicons name="close" size={16} color={colors.text} />
          </Pressable>
          {searchable && (
            <View style={styles.search}>
              <Ionicons name="search" size={14} color={colors.muted} />
              <TextInput style={styles.input} placeholder={t('Search')} placeholderTextColor={colors.muted} value={q} onChangeText={setQ} />
            </View>
          )}
          <ScrollView style={{ maxHeight: 320 }}>
            {list.map((o) => {
              const on = o === selected;
              return (
                <Pressable key={o} style={styles.row} onPress={() => { setQ(''); onSelect(o); }}>
                  <Text style={[styles.text, on && styles.textOn]}>{o}</Text>
                  {on && <Ionicons name="checkmark" size={16} color={colors.primary} />}
                </Pressable>
              );
            })}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', padding: 16 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16 },
  title: { textAlign: 'center', fontFamily: fonts.medium, fontSize: 12, color: colors.text, marginBottom: 12 },
  close: { position: 'absolute', top: 14, right: 14 },
  search: { flexDirection: 'row', alignItems: 'center', gap: 6, height: 36, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, paddingHorizontal: 10, marginBottom: 6 },
  input: { flex: 1, fontFamily: fonts.regular, fontSize: 11, color: colors.text },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 42, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  text: { fontFamily: fonts.regular, fontSize: 11, color: colors.muted },
  textOn: { fontFamily: fonts.medium, color: colors.primary },
});
