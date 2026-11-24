import { useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { Msg, threads } from '../data/messages';
import { useLang } from '../i18n';
import { colors, fonts } from '../theme';
import { ScreenProps } from '../navigation/types';

// Длинные числа (коды, телефоны) выделяем цветом, как в Figma
function Rich({ text }: { text: string }) {
  return (
    <Text style={styles.bankText}>
      {text.split(/(\d{6,})/).map((p, i) => (/^\d{6,}$/.test(p) ? <Text key={i} style={{ color: colors.primary }}>{p}</Text> : p))}
    </Text>
  );
}

export default function ChatScreen({ navigation, route }: ScreenProps<'Chat'>) {
  const { t } = useLang();
  const insets = useSafeAreaInsets();
  const thread = threads.find((x) => x.id === route.params.id) ?? threads[0];
  const [messages, setMessages] = useState<Msg[]>(thread.messages);
  const [text, setText] = useState('');
  const scroll = useRef<ScrollView>(null);

  const send = () => {
    const v = text.trim();
    if (!v) return;
    setMessages((m) => [...m, { from: 'me', text: v }]);
    setText('');
  };

  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header light title={t(thread.title)} onBack={navigation.goBack} />
      <ScrollView ref={scroll} contentContainerStyle={styles.list} onContentSizeChange={() => scroll.current?.scrollToEnd({ animated: true })}>
        {messages.map((m, i) => (
          <View key={i}>
            {!!m.date && <Text style={styles.date}>{m.date}</Text>}
            {m.from === 'bank' ? (
              <View style={[styles.bubble, styles.bank]}><Rich text={m.text} /></View>
            ) : (
              <View style={[styles.bubble, styles.me]}><Text style={styles.meText}>{m.text}</Text></View>
            )}
          </View>
        ))}
      </ScrollView>
      <View style={[styles.inputRow, { paddingBottom: insets.bottom + 8 }]}>
        <TextInput style={styles.input} placeholder={t('Type something...')} placeholderTextColor={colors.muted} value={text} onChangeText={setText} onSubmitEditing={send} />
        <Pressable style={[styles.send, !text.trim() && { backgroundColor: colors.primaryLight }]} onPress={send}>
          <Ionicons name="arrow-forward" size={16} color="#fff" />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  list: { padding: 16, gap: 10 },
  date: { textAlign: 'center', fontFamily: fonts.regular, fontSize: 8, color: colors.muted, marginVertical: 10 },
  bubble: { maxWidth: '78%', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10 },
  bank: { alignSelf: 'flex-start', backgroundColor: '#F1F0F7' },
  me: { alignSelf: 'flex-end', backgroundColor: colors.primary },
  bankText: { fontFamily: fonts.regular, fontSize: 10, color: colors.text, lineHeight: 15 },
  meText: { fontFamily: fonts.regular, fontSize: 10, color: '#fff' },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 16, paddingTop: 8 },
  input: { flex: 1, height: 40, borderWidth: 1, borderColor: colors.border, borderRadius: 10, paddingHorizontal: 12, fontFamily: fonts.regular, fontSize: 11, color: colors.text },
  send: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
});
