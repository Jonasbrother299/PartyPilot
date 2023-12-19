import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SIZES, images } from "../constants";
import Logo from "../components/Image/Logo";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../config/supabaseConfig";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events when the component mounts
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase.from("events").select("*");
      if (error) {
        console.error("Error fetching events:", error);
      } else {
        setEvents(data);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const renderEventItem = ({ item }) => (
    // Customize the rendering of each event item as needed
    <TouchableOpacity onPress={() => handleEventPress(item)}>
      <View style={styles.eventItem}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventDescription}>{item.description}</Text>
        {/* Add other event details here */}
      </View>
    </TouchableOpacity>
  );

  const handleEventPress = (event) => {
    navigation.navigate("EventDetail", { event });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.heroColour, "black"]}
        style={styles.background}
      ></LinearGradient>
      <View style={styles.wrapper}>
        <View style={{ flex: 1, alignItems: "flex-start" }}>
          <Logo dimension={70} src={images.Logo} />
        </View>
      </View>
      <Text style={styles.headline}>Events</Text>
      {/* Render the list of events */}
      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderEventItem}
        onRefresh={() => fetchEvents()}
        refreshing={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    marginTop: 30,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  headline: {
    color: COLORS.fontColour,
    fontSize: SIZES.xLarge,
    paddingHorizontal: 30,
  },
  eventItem: {
    borderBottomWidth: 1,
    backgroundColor: COLORS.primaryColour1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  eventTitle: {
    fontSize: 18,
    color: COLORS.fontColour,
    fontWeight: "bold",
  },
  eventDescription: {
    fontSize: 16,
    color: COLORS.fontColour,
  },
});
