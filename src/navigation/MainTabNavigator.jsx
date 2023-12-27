import React from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import Profile from "../screens/Profile/Profile";
import ProfileImage from "../components/ProfileImage/ProfileImage";
import BottomSheet from "../components/BottomSheet/BottomSheet";
import Discover from "../screens/Discover/Discover";
import Favourite from "../screens/Favourite/Favourite";

import { COLORS, icons, SIZES } from "../constants";
import { useSession } from "../hooks/useSession";

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  const { session } = useSession();

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.black }}>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: COLORS.grey,
            height: 60,
            elevation: 0,
            outline: 0,
            borderColor: "transparent",
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image
                  source={icons.home}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: focused
                      ? COLORS.accentColour1Orange
                      : COLORS.fontColour,
                  }}
                />
                <Text
                  style={{
                    top: 5,
                    fontSize: SIZES.xSmall,
                    color: focused ? COLORS.fontColour : COLORS.primaryColour2,
                  }}
                >
                  Home
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Discover"
          component={Discover}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image
                  source={icons.discover}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused
                      ? COLORS.accentColour1Orange
                      : COLORS.fontColour,
                  }}
                />
                <Text
                  style={{
                    top: 5,
                    fontSize: SIZES.xSmall,
                    color: focused ? COLORS.fontColour : COLORS.primaryColour2,
                  }}
                >
                  Discover
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Create"
          component={BottomSheet}
          options={{
            tabBarIcon: ({ focused }) => (
              <View>
                <Text style={{ fontSize: SIZES.xxLarge }}>+</Text>
              </View>
            ),
            tabBarButton: (props) => <BottomSheet {...props} />,
          }}
        />
        <Tab.Screen
          name="Favourite"
          component={Favourite}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image
                  source={icons.favourite}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused
                      ? COLORS.accentColour1Orange
                      : COLORS.fontColour,
                  }}
                />
                <Text
                  style={{
                    top: 5,
                    fontSize: SIZES.xSmall,
                    color: focused ? COLORS.fontColour : COLORS.primaryColour2,
                  }}
                >
                  Favourite
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <ProfileImage
                  dimension={25}
                  focused={focused}
                  session={session}
                />
                <Text
                  style={{
                    top: 5,
                    fontSize: SIZES.xSmall,
                    color: focused ? COLORS.fontColour : COLORS.primaryColour2,
                  }}
                >
                  Profile
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}
