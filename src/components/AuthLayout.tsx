import { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from './Header';
import { colors, fonts, radius } from '../theme';

type Props = { header: string; title: string; subtitle: string; onBack?: () => void; children: ReactNode };

// Фиолетовая шапка + белая карточка с заголовком (Sign in / Sign up)
export default function AuthLayout({ header, title, subtitle, onBack, children }: Props) {
  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header title={header} onBack={onBack} />
      <View style={styles.sheet}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          {children}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.primary },
  sheet: { flex: 1, backgroundColor: '#fff', borderTopLeftRadius: radius.lg, borderTopRightRadius: radius.lg, marginTop: 8 },
  content: { padding: 20, paddingBottom: 32 },
  title: { fontFamily: fonts.semibold, fontSize: 22, color: colors.primary, marginTop: 8 },
  subtitle: { fontFamily: fonts.regular, fontSize: 11, color: colors.text, marginTop: 2 },
});
