import React from 'react';
import { AppRegistry } from 'react-native';
import {name as appName } from './app.json';
import { StatusBar } from 'expo-status-bar';

import supabaseConfig from './src/config/supabaseConfig';
import RootNavigation from './src/navigation/index';
import { SessionProvider } from './src/hooks/useSession';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// Register the app
AppRegistry.registerComponent(appName, () => App);

export default function App() {

  return (
    <SessionProvider>
       <GestureHandlerRootView style={{ flex: 1 }}>
        {/* Style of the Bar on Top that is integrated in the phones */}
        <StatusBar translucent showHideTransition="fade" barStyle='light-content' />
        <RootNavigation />
        </GestureHandlerRootView>
    </SessionProvider>
  );
}

