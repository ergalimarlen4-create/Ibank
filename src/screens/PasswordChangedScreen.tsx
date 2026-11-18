import { useLang } from '../i18n';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import Button from '../components/Button';
import { colors, fonts } from '../theme';
import { ScreenProps } from '../navigation/types';

export default function PasswordChangedScreen({ navigation }: ScreenProps<'PasswordChanged'>) {
  const { t } = useLang();
  const toSignIn = () => navigation.reset({ index: 0, routes: [{ name: 'SignIn' }] });
  return (
    <View style={styles.root}>
      <Header light onBack={toSignIn} />
      <View style={styles.body}>
        {/* Замени на иллюстрацию из Figma */}
        <Ionicons name="shield-checkmark" size={140} color={colors.primary} style={{ alignSelf: 'center', marginVertical: 40 }} />
        <Text style={styles.title}>{t('Change password successfully!')}</Text>
        <Text style={styles.text}>{t('You have successfully change password.')}{'\n'}{t('Please use the new password when Sign in.')}</Text>
        <Button title={t('Ok')} onPress={toSignIn} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  body: { paddingHorizontal: 16 },
  title: { textAlign: 'center', fontFamily: fonts.medium, fontSize: 13, color: colors.primary, marginTop: 8 },
  text: { textAlign: 'center', fontFamily: fonts.regular, fontSize: 11, color: colors.text, marginVertical: 20, lineHeight: 16 },
});
