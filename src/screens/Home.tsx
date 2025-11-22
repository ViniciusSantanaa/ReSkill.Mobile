import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

type Session = {
  id: number;
  topic: string;
  durationMinutes: number;
  created: string;
};

export default function Home({ navigation }: Props) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');

  async function fetchSessions() {
    setLoading(true);
    try {
      const response = await api.get('/sessions');

      const sessionsData = response.data.items.map((item: any) => item.data);
      
      setSessions(sessionsData); 

    } catch (error) {
      console.log("Erro ao buscar sessões:", error);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchSessions();
    }, [])
  );

  useEffect(() => {
    async function getUser() {
      const userString = await AsyncStorage.getItem('@ReSkill:user');
      if (userString) {
        const user = JSON.parse(userString);
        setUserName(user.email.split('@')[0]); 
      }
    }
    getUser();
  }, []);

  const renderItem = ({ item }: { item: Session }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('EditSession', { sessionId: item.id })}
    >
      <View>
        <Text style={styles.cardTitle}>{item.topic}</Text>
        <Text style={styles.cardSubtitle}>{item.durationMinutes} minutos</Text>
      </View>
      <Text style={styles.cardStatus}>Concluído</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Olá, {userName}</Text>
        <Text style={styles.subGreeting}>Continue estudando!</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#6200EE" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={sessions}
          keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={fetchSessions} />
          }
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhuma sessão registrada.</Text>
          }
        />
      )}

      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate('NewSession')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={{ position: 'absolute', top: 40, right: 20 }} 
        onPress={() => navigation.navigate('About')}
      >
        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>SOBRE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    backgroundColor: '#6200EE',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  subGreeting: {
    fontSize: 14,
    color: '#E0E0E0',
  },
  list: {
    padding: 20,
  },
  card: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2, 
    shadowColor: '#000', 
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  cardStatus: {
    fontSize: 12,
    color: 'green',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 50,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#6200EE',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  fabText: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: -4, 
  },
});