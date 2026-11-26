import { useState } from 'react';
import { KeyboardAvoidingView, Image, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Header from '../components/Header';
import Button from '../components/Button';
import { useProfile } from '../data/profile';
import { useLang } from '../i18n';
import { colors, fonts, radius } from '../theme';
import { ScreenProps } from '../navigation/types';

// В браузере выбранное фото приходит как blob: — превращаем в data-URL, чтобы оно сохранялось
async function toPersistent(uri: string): Promise<string> {
  if (!uri.startsWith('blob:')) return uri;
  const blob = await (await fetch(uri)).blob();
  return new Promise((resolve) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.readAsDataURL(blob);
  });
}

export default function EditProfileScreen({ navigation }: ScreenProps<'EditProfile'>) {
  const { t } = useLang();
  const { profile, setProfile } = useProfile();
  const [name, setName] = useState(profile.name);
  const [photo, setPhoto] = useState<string | null>(profile.photo);

  const pick = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsEditing: true, aspect: [1, 1], quality: 0.5 });
    if (!res.canceled) setPhoto(await toPersistent(res.assets[0].uri));
  };

  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header light title={t('Profile')} onBack={navigation.goBack} />
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
        <Pressable style={styles.avatarWrap} onPress={pick}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.empty]}><Ionicons name="person" size={52} color={colors.primary} /></View>
          )}
          <View style={styles.badge}><Ionicons name="camera" size={14} color="#fff" /></View>
        </Pressable>
        <Text style={styles.change} onPress={pick}>{t('Change photo')}</Text>
        {!!photo && <Text style={styles.remove} onPress={() => setPhoto(null)}>{t('Remove photo')}</Text>}

        <Text style={styles.label}>{t('Your name')}</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder={t('Name')} placeholderTextColor={colors.muted} />

        <Button title={t('Save')} disabled={!name.trim()} style={{ marginTop: 28 }}
          onPress={() => { setProfile({ name: name.trim(), photo }); navigation.goBack(); }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 20, paddingBottom: 40 },
  avatarWrap: { alignSelf: 'center', marginTop: 8 },
  avatar: { width: 110, height: 110, borderRadius: 55 },
  empty: { backgroundColor: colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  badge: { position: 'absolute', right: 2, bottom: 2, width: 30, height: 30, borderRadius: 15, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: '#fff' },
  change: { textAlign: 'center', fontFamily: fonts.medium, fontSize: 12, color: colors.primary, marginTop: 12 },
  remove: { textAlign: 'center', fontFamily: fonts.regular, fontSize: 11, color: colors.danger, marginTop: 8 },
  label: { fontFamily: fonts.regular, fontSize: 11, color: colors.muted, marginTop: 28, marginBottom: 6 },
  input: { height: 46, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, paddingHorizontal: 14, fontFamily: fonts.regular, fontSize: 14, color: colors.text },
});
