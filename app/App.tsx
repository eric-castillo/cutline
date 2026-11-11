import React from 'react';
import './src/i18n';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {ClientTabs} from './src/navigation/ClientTabs';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <ClientTabs />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
