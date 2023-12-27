import React, { useEffect } from "react";
import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import { StatusBar } from "expo-status-bar";

import supabaseConfig from "./src/config/supabaseConfig";
import RootNavigation from "./src/navigation/index";
import { SessionProvider } from "./src/hooks/useSession";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { preloadBackgroundImage } from "./src/constants/images";

// Register the app
AppRegistry.registerComponent(appName, () => App);

export default function App() {
  useEffect(() => {
    // Preload the background image
    preloadBackgroundImage();
  }, []);
  return (
    //  SeesionProvider provides the user current Session through the session we get user and user.id
    <SessionProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {/* Style of the Bar on Top that is integrated in the phones */}
        <StatusBar
          hidden={true}
          translucent={true}
          backgroundColor="transparent"
          barStyle="dark-content"
          animated={true}
        />

        <RootNavigation />
      </GestureHandlerRootView>
    </SessionProvider>
  );
}
