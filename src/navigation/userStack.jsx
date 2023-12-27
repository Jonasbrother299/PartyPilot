import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CreateEvent from "../screens/Create/createEvent";
import CreateRecipe from "../screens/Create/createRecipe";
import EventDetail from "../screens/Create/EventDetail";
import RecipeDetail from "../screens/Create/RecipeDetail";
import MainTabNavigator from "./MainTabNavigator";
import SearchIcon from "../components/Search/SearchIcon";
import Search from "../screens/Search/Search";
import EditProfile from "../screens/Profile/EditProfile";

const Stack = createNativeStackNavigator();

export default function UserStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Bottom Tab Navigator */}
        <Stack.Screen name="Main" component={MainTabNavigator} />
        {/* Screens not part of the bottom navigation */}
        <Stack.Screen
          name="CreateEvent"
          component={CreateEvent}
          options={{
            presentation: "transparentModal",
            animationTypeForReplace: "pop",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SearchIcon"
          component={SearchIcon}
          options={{
            presentation: "transparentModal",
            animationTypeForReplace: "pop",
          }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            presentation: "transparentModal",
            animationTypeForReplace: "pop",
          }}
        />
        <Stack.Screen
          name="CreateCocktail"
          component={CreateRecipe}
          options={{
            presentation: "transparentModal",
            animationTypeForReplace: "pop",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EventDetail"
          component={EventDetail}
          options={{
            presentation: "transparentModal",
            animationTypeForReplace: "pop",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RecipeDetail"
          component={RecipeDetail}
          options={{
            presentation: "transparentModal",
            animationTypeForReplace: "pop",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            presentation: "transparentModal",
            animationTypeForReplace: "pop",
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
