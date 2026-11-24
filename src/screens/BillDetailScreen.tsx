import { ScrollView, StyleSheet, View } from 'react-native';
import Header from '../components/Header';
import BillDetails from '../components/BillDetails';
import { useLang } from '../i18n';
import { ScreenProps } from '../navigation/types';

export default function BillDetailScreen({ navigation, route }: ScreenProps<'BillDetail'>) {
  const { t } = useLang();
  const { kind } = route.params;
  return (
    <View style={styles.root}>
      <Header light title={t(`${kind} payment`)} onBack={navigation.goBack} />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <BillDetails kind={kind} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({ root: { flex: 1, backgroundColor: '#fff' } });
