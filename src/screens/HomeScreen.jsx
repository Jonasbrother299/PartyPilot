import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../config/supabaseConfig";
import { useFocusEffect } from "@react-navigation/native";

import Logo from "../components/Basics/Image/Logo";
import CTAButton from "../components/Basics/CTAButton/CTAButton";
import Spacer from "../components/Basics/Spacer/spacer";
import { COLORS, SIZES, images } from "../constants";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [events, setEvents] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [selectedTab, setSelectedTab] = useState("Events");

  useFocusEffect(
    useCallback(() => {
      fetchRecipe();
      fetchEvents();
    }, [])
  );

  const fetchRecipe = async () => {
    try {
      const { data, error } = await supabase.from("recipes").select("*");
      if (error) {
        console.error("Error fetching recipes:", error);
      } else {
        setRecipes(data);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

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

  const handleEmpty = () => {
    return <Text style={styles.title}> No data present!</Text>;
  };

  const renderRecipeItem = ({ item }) => (
    <TouchableOpacity
      style={styles.resultContainer}
      onPress={() => handleRecipePress(item)}
    >
      <View style={styles.recipeItem}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.overlay}>
          <Text style={styles.recipeTitle}>{item.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEventItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleEventPress(item)}>
      <View style={styles.eventItem}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
  const handleRecipePress = (recipe) => {
    navigation.navigate("RecipeDetail", { recipe });
  };

  const handleEventPress = (event) => {
    navigation.navigate("EventDetail", { event });
  };

  function goToCreateEvent() {
    if (selectedTab === "Events") {
      navigation.navigate("CreateEvent");
    } else {
      navigation.navigate("CreateCocktail");
    }
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.heroColour, "black"]}
        style={styles.background}
      ></LinearGradient>
      <Spacer vertical={0} horizontal={10} top={30}>
        <View style={styles.gridContainer}>
          {/* <Logo dimension={70} src={images.Logo} /> */}
          {/* <CTAButton
            title={"+"}
            height={50}
            variant={"primary"}
            width={50}
            onPress={goToCreateEvent}
          /> */}
        </View>
      </Spacer>
      <Spacer horizontal={0} vertical={20}>
        <View style={styles.gridContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === "Events" && styles.selectedTab,
            ]}
            onPress={() => setSelectedTab("Events")}
          >
            <Text style={styles.tabButtonText}>Events</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === "Recipe" && styles.selectedTab,
            ]}
            onPress={() => setSelectedTab("Recipe")}
          >
            <Text style={styles.tabButtonText}>Recipe</Text>
          </TouchableOpacity>
        </View>
      </Spacer>

      {selectedTab === "Events" && (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderEventItem}
          onRefresh={() => fetchEvents()}
          refreshing={false}
        />
      )}
      {selectedTab === "Recipe" && (
        <FlatList
          data={recipes}
          ListEmptyComponent={handleEmpty}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderRecipeItem}
          numColumns={2}
          onRefresh={() => fetchRecipe()}
          refreshing={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  gridContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: COLORS.primaryColour1,
    borderRadius: 30,
  },
  selectedTab: {
    backgroundColor: COLORS.primaryColour2,
  },
  tabButtonText: {
    color: COLORS.fontColour,
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

  resultContainer: {
    flex: 1,
    paddingBottom: 10,
  },
  recipeItem: {
    flex: 1,
    marginBottom: 20,
    overflow: "hidden",
    marginHorizontal: 10,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
  },
  overlay: {
    width: "100%",
    backgroundColor: COLORS.primaryColour1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 8,
  },
  recipeTitle: {
    color: "white",
    textAlign: "center",
  },
});
