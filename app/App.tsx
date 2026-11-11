import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {restoreLanguage} from './src/i18n';
import {ClientTabs} from './src/navigation/ClientTabs';

export default function App() {
  const [ready, setReady] = useState(false);

  // Apply the saved language before the first paint to avoid an EN -> ES flash.
  useEffect(() => {
    restoreLanguage().finally(() => setReady(true));
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <ClientTabs />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
