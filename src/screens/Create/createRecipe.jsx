import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
  TextInput,
  Alert,
  FlatList,
} from "react-native";
import { supabase } from "../../config/supabaseConfig";
import { useSession } from "../../hooks/useSession";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";

import { COLORS, SIZES, images, icons } from "../../constants";
import Icons from "../../components/Basics/Image/icons";
import { SectionCocktailSection } from "../../components/Recipe/SectionCocktailRecipe";
import Spacer from "../../components/Basics/Spacer/spacer";
import CTAButton from "../../components/Basics/CTAButton/CTAButton";
import ProgressBarCreatRecipe from "../../components/Basics/ProgressBar/ProgressBarCreatRecipe";

export default function CreateRecipe() {
  const { session } = useSession();
  const navigation = useNavigation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState("");
  console.log(ingredients);
  const [section, setSection] = useState("General");
  const [progressAnim] = useState(new Animated.Value(0));
  const [progress, setProgress] = useState(0);

  const [filepath, setFilepath] = useState(null);
  const [selectedImageUri, setSelectedImageUri] = useState(null);

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  async function editRecipeImage() {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        throw new Error("Permission to access media library denied");
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        const img = result.assets[0];
        console.log(img.uri);
        const base64 = await FileSystem.readAsStringAsync(img.uri, {
          encoding: "base64",
        });

        // Use a unique identifier for the recipe (e.g., recipe title or random ID)
        const recipeId =
          title.toLowerCase().replace(/\s/g, "_") ||
          Math.random().toString(36).substring(7);
        const filePath = `${session.user.id}/${recipeId}/image.${
          img.type === "image" ? "png" : "mp4"
        }`;
        const contentType = img.type === "image" ? "image/png" : "video/mp4";

        // Check if there is already an image linked to the recipe
        if (selectedImageUri) {
          // If an image is already linked, delete it before uploading the new one
          await supabase.storage.from("recipes").remove([selectedImageUri]);
        }

        // Upload the new image and update the selectedImageUri
        await supabase.storage
          .from("recipes")
          .upload(filePath, decode(base64), {
            contentType,
          });
        setFilepath(filePath);
        setSelectedImageUri(img.uri);
      }
    } catch (error) {
      console.error("ImagePicker Error:", error.message);
      Alert.alert("Error", "Failed to load image. Please try again.");
    }
  }

  const handleSectionPress = (sectionName) => {
    setSection(sectionName);
    switch (sectionName) {
      case "General":
        setProgress(0);
        break;
      case "Ingredients":
        setProgress(111);
        break;
      case "Mixing":
        setProgress(222);
        break;
      case "Garnish":
        setProgress(333);
        break;
      default:
        setProgress(0);
    }
  };

  const handleGoBack = () => {
    navigation.navigate("Home");
  };

  const handleCreateRecipe = async () => {
    try {
      const { data, error } = await supabase.from("recipes").upsert([
        {
          title,
          description,
          image: selectedImageUri,
          admin: session.user.id,
        },
      ]);

      if (error) {
        console.error("Error creating recipe:", error);
      } else {
        console.log("Recipe created successfully", data);
        navigation.navigate("Home"); // Replace 'Home' with the actual name of your home screen
      }
    } catch (error) {
      console.error("Error creating recipe:", error);
    }
  };
  const addIngredient = () => {
    if (ingredient.trim() !== "") {
      setIngredients([...ingredients, ingredient]);
      setIngredient(""); // Clear the TextInput after adding ingredient
    }
  };

  const handleEmpty = () => {
    return <Text style={styles.title}> No data present!</Text>;
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.heroColour, "black"]}
        style={styles.background}
      ></LinearGradient>
      <View style={styles.wrapper}>
        {/* Back Button */}
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Icons src={icons.backArrow} dimension={20} />
        </TouchableOpacity>
      </View>
      {/* Head Image for Recipe */}
      <Spacer horizontal={40} vertical={50}>
        <Spacer horizontal={0} vertical={20}>
          <ProgressBarCreatRecipe progress={progressAnim} />
        </Spacer>
        <TouchableOpacity onPress={editRecipeImage}>
          {selectedImageUri ? (
            <Image
              key={selectedImageUri}
              source={{ uri: selectedImageUri }}
              style={styles.recipeImage}
              resizeMode="contain"
            />
          ) : (
            <Image
              key={images.profile}
              source={images.CocktailImage}
              style={styles.recipeImage}
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>
      </Spacer>

      <Spacer horizontal={40} vertical={0}>
        <SectionCocktailSection handleSectionPress={handleSectionPress} />
      </Spacer>
      {section === "General" && (
        <Spacer horizontal={40} vertical={40}>
          <TextInput
            style={styles.input}
            placeholder="Recipe Name"
            placeholderTextColor="#80848A"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            placeholderTextColor="#80848A"
            value={description}
            onChangeText={setDescription}
          />
        </Spacer>
      )}
      {section === "Ingredients" && (
        <Spacer horizontal={40} vertical={40}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.ingredientInput}
              placeholder="Ingredient"
              placeholderTextColor="#80848A"
              value={ingredient}
              onChangeText={setIngredient}
            />
            <CTAButton
              title={"+"}
              variant={"primary"}
              width={50}
              height={50}
              onPress={addIngredient}
            />
          </View>
          {ingredients.length > 0 && (
            <View style={styles.ingredientsList}>
              <FlatList
                data={ingredients}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <Text style={styles.ingredientItem}>{item}</Text>
                )}
                numColumns={3}
                ListEmptyComponent={handleEmpty}
              />
            </View>
          )}
        </Spacer>
      )}
      {section === "Mixing" && (
        <Spacer horizontal={40} vertical={40}>
          <Text style={styles.Text}>Mixing Section Content</Text>
        </Spacer>
      )}
      {section === "Garnish" && (
        <Spacer horizontal={40} vertical={40}>
          <Text style={styles.Text}>Garnish Section Content</Text>
          <Spacer horizontal={40} vertical={40}>
            <CTAButton
              title={"Create Recipe"}
              height={50}
              width={"100%"}
              variant={"primary"}
              onPress={handleCreateRecipe}
            />
          </Spacer>
        </Spacer>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  Text: {
    color: COLORS.fontColour,
    fontSize: 13,
  },
  container: {
    backgroundColor: COLORS.heroColour,
    width: "100%",
    height: "100%",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    width: 50,
    height: 50,
    marginBottom: 10,
    left: 10,
    top: 60,
    zIndex: 2,
  },
  headline: {
    fontSize: SIZES.xxLarge,
    color: COLORS.fontColour,
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.accentColour1Orange,
    height: 50,
    fontSize: 24,
    marginVertical: 10,
    fontWeight: "300",
    color: "white",
  },
  ingredientInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.accentColour1Orange,
    marginVertical: 10,
    height: 50,
    fontSize: 24,
    fontWeight: "300",
    color: "white",
    marginRight: 40,
  },
  inputBtn: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.accentColour1Orange,
    marginVertical: 10,
    borderRadius: 4,
    height: 50,
    paddingLeft: 8,
    fontSize: 18,
    justifyContent: "center",
    marginTop: 14,
  },
  submitBtn: {
    backgroundColor: "#342342",
    paddingVertical: 22,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 12,
    marginVertical: 16,
  },
  selectedStartDate: {
    fontSize: SIZES.medium,
    color: COLORS.fontColour,
  },
  recipeImage: {
    width: "100%",
    height: 220,
    resizeMode: "cover",
    borderRadius: 20,
  },
  addIngredients: {
    width: 50,
  },
  addIngredientsHeadline: {
    color: COLORS.fontColour,
    width: 200,
    fontSize: SIZES.xLarge,
    padding: 10,
  },

  ingredientsList: {
    marginTop: 20,
    flexDirection: "column",
    // flexWrap: "wrap",
  },
  ingredientItem: {
    marginRight: 10,
    width: 100,
    padding: 10,
    borderRadius: 20,
    color: COLORS.fontColour,
    backgroundColor: COLORS.primaryColour1,
    fontSize: 16,
    marginBottom: 15,
  },
});
