import { useCallback, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { supabase } from "../../config/supabaseConfig";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";

import { COLORS, SIZES, images } from "../../constants";
import Spacer from "../../components/Basics/Spacer/spacer";
import Background from "../../components/Basics/Image/Background";
import SearchIcon from "../../components/Search/SearchIcon";

export default function Discover() {
  const [recipes, setRecipes] = useState([]);

  useFocusEffect(
    useCallback(() => {
      // Fetch recipes when the screen gains focus
      fetchRecipe();
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

  const handleEmpty = () => {
    return <Text style={styles.title}> No data present!</Text>;
  };

  const renderRecipeItem = ({ item }) => (
    <TouchableOpacity
      // onPress={() => handleEventPress(item)}
      style={styles.resultContainer}
    >
      <View style={styles.eventItem}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.overlay}>
          <Text style={styles.recipeTitle}>{item.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      {/* Background Component */}
      <Background src={images.Background} style={styles.backgroundImage} />

      <Spacer vertical={70} horizontal={20}>
        <View style={styles.header}>
          <Text style={styles.Headline}>Discover</Text>
          <SearchIcon />
        </View>
        <Spacer vertical={30} horizontal={0}>
          <FlatList
            data={recipes}
            ListEmptyComponent={handleEmpty}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderRecipeItem}
            numColumns={2}
            onRefresh={() => fetchRecipe()}
            refreshing={false}
          />
        </Spacer>
      </Spacer>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "relative",
    backgroundColor: COLORS.heroColour,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  Headline: {
    fontSize: SIZES.xxLarge,
    color: COLORS.fontColour,
  },
  resultContainer: {
    flex: 1,
    paddingBottom: 10,
  },
  eventItem: {
    flex: 1,
    marginBottom: 20,
    overflow: "hidden",
    borderColor: COLORS.primaryColour1, // Add border color
    borderWidth: 1, // Add border width
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
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 30,
  },
  recipeTitle: {
    color: "white",
    textAlign: "center",
  },
});
