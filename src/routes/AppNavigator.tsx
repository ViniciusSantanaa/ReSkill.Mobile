import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';
import NewSession from '../screens/NewSession';
import EditSession from '../screens/EditSession';
import About from '../screens/About';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} options={{ title: 'Criar Conta' }} />


        <Stack.Screen name="Home" component={Home} options={{ title: 'Minhas Sessões' }} />
        <Stack.Screen name="NewSession" component={NewSession} options={{ title: 'Nova Sessão' }} />
        <Stack.Screen name="EditSession" component={EditSession} options={{ title: 'Editar Sessão' }} />
        <Stack.Screen name="About" component={About} options={{ title: 'Sobre o App' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}