import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import api from '../services/api';

type EditSessionScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EditSession'>;
type EditSessionScreenRouteProp = RouteProp<RootStackParamList, 'EditSession'>;

type Props = {
  navigation: EditSessionScreenNavigationProp;
  route: EditSessionScreenRouteProp;
};

export default function EditSession({ navigation, route }: Props) {
  const { sessionId } = route.params;

  const [topic, setTopic] = useState('');
  const [duration, setDuration] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadSession() {
      try {
        console.log("Buscando sessão ID:", sessionId);
        const response = await api.get(`/sessions/${sessionId}`);

        const sessionData = response.data.data || response.data; 
        
        setTopic(sessionData.topic);
        setDuration(sessionData.durationMinutes.toString());
      } catch (error) {
        console.log("Erro ao carregar:", error);
        Alert.alert('Erro', 'Erro ao carregar detalhes.');
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    }
    loadSession();
  }, [sessionId]);

  async function handleUpdate() {
    if (!topic || !duration) return Alert.alert('Erro', 'Preencha os campos.');
    
    setSaving(true);
    try {
      await api.put(`/sessions/${sessionId}`, {
        id: sessionId,
        topic: topic,
        durationMinutes: parseInt(duration),
        isCompleted: true
      });
      Alert.alert('Sucesso', 'Sessão atualizada!');
      navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível atualizar.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    setSaving(true);
    console.log(`Tentando deletar ID: ${sessionId}`);

    try {
      const url = `/sessions/${sessionId}`;
      console.log("Chamando API em:", url);

      await api.delete(url);
      
      console.log("Deletado com sucesso!");
      Alert.alert('Sucesso', 'Sessão excluída.');
      navigation.goBack();

    } catch (error: any) {
      console.log("Erro no DELETE:", error);
      Alert.alert('Erro', 'Falha ao excluir. Veja o console.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6200EE" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Editar Tópico</Text>
      <TextInput 
        style={styles.input} 
        value={topic}
        onChangeText={setTopic}
      />

      <Text style={styles.label}>Editar Duração (min)</Text>
      <TextInput 
        style={styles.input} 
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
      />

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.saveButton} 
          onPress={handleUpdate}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.saveButtonText}>Salvar Alterações</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.deleteButton} 
          onPress={handleDelete}
          disabled={saving}
        >
          <Text style={styles.deleteButtonText}>Excluir Sessão</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 16,
  },
  footer: {
    marginTop: 40,
    gap: 15,
  },
  saveButton: {
    backgroundColor: '#6200EE',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D32F2F',
  },
  deleteButtonText: {
    color: '#D32F2F',
    fontWeight: 'bold',
    fontSize: 16,
  },
});