import {
  Text,
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { COLORS, SIZES, images } from "../../constants";
import { useEffect, useState } from "react";
import Spacer from "../../components/Spacer/spacer";
import Background from "../../components/Image/Background";
import SearchIcon from "../../components/Search/SearchIcon";
import { supabase } from "../../config/supabaseConfig";
import { LinearGradient } from "expo-linear-gradient";

export default function Discover() {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    // Fetch events when the component mounts
    fetchRecipe();
  }, []);

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
    // Customize the rendering of each event item as needed
    <TouchableOpacity
      // onPress={() => handleEventPress(item)}
      style={styles.resultContainer}
    >
      <View style={styles.eventItem}>
        <Image source={images.CocktailImage} style={styles.image} />
        <LinearGradient
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.9)"]}
          locations={[0, 0.5]}
          style={styles.gradient}
        />
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
    position: "relative",
  },
  image: {
    width: 150,
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
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
