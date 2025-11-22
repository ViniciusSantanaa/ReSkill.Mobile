import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Clipboard, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

// --- CONFIGURAÇÃO MANUAL DO HASH ---
// Depois de subir no GitHub, você vai copiar o código lá e colar aqui.
export const COMMIT_HASH = "Ainda não gerado"; 
// -----------------------------------

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'About'>;
};

export default function About({ navigation }: Props) {
  
  const copyToClipboard = () => {
    Clipboard.setString(COMMIT_HASH);
    Alert.alert('Copiado', 'Hash copiado para a área de transferência.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ReSkill Mobile</Text>
      <Text style={styles.version}>Versão 1.0.0</Text>
      
      <View style={styles.card}>
        <Text style={styles.label}>Hash do Commit de Referência:</Text>
        <TouchableOpacity onPress={copyToClipboard}>
          <Text style={styles.hash}>{COMMIT_HASH}</Text>
          <Text style={styles.hint}>(Toque para copiar)</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.group}>Desenvolvido por Vinícius</Text>
      <Text style={styles.group}>Global Solution - 2025</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5F5' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#6200EE', marginBottom: 10 },
  version: { fontSize: 16, color: '#666', marginBottom: 40 },
  card: { backgroundColor: '#FFF', padding: 20, borderRadius: 10, width: '100%', alignItems: 'center', elevation: 3, marginBottom: 40 },
  label: { fontSize: 14, color: '#333', marginBottom: 5 },
  hash: { fontSize: 18, fontWeight: 'bold', color: '#333', textAlign: 'center', fontFamily: 'monospace' },
  hint: { fontSize: 12, color: '#999', marginTop: 5 },
  group: { fontSize: 16, color: '#555', marginTop: 5 },
  button: { marginTop: 50, backgroundColor: '#6200EE', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 25 },
  buttonText: { color: '#FFF', fontWeight: 'bold' }
});