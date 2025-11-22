import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import api from '../services/api';

type NewSessionScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'NewSession'>;

type Props = {
  navigation: NewSessionScreenNavigationProp;
};

export default function NewSession({ navigation }: Props) {
  const [topic, setTopic] = useState('');
  const [duration, setDuration] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleCreate() {
    if (!topic || !duration) {
      return Alert.alert('Erro', 'Preencha todos os campos.');
    }

    setLoading(true);
    try {
      await api.post('/sessions', {
        topic: topic,
        durationMinutes: parseInt(duration),
        isCompleted: true
      });
      
      Alert.alert('Sucesso', 'Sessão registrada!');
      navigation.goBack(); 

    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível salvar a sessão.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>O que você estudou?</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Ex: C#, React Native, IoT..."
        value={topic}
        onChangeText={setTopic}
      />

      <Text style={styles.label}>Por quantos minutos?</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Ex: 60"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleCreate} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Salvar Sessão</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  button: {
    backgroundColor: '#6200EE',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});