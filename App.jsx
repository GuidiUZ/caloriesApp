import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context'
import Routes from './src/routes/Routes';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
      <Routes/>
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: '#fff',
  },
});