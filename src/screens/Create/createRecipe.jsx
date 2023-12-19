import React, { useState } from "react";
import {
  Text,
  TextInput,
  Button,
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import { COLORS, SIZES, images, icons } from "../../constants";
import DatePicker from "react-native-modern-datepicker";
import { getFormatedDate } from "react-native-modern-datepicker";
import { supabase } from "../../config/supabaseConfig";
import { useSession } from "../../hooks/useSession";
import { useNavigation } from "@react-navigation/native";
import Icons from "../../components/Image/icons";
import { LinearGradient } from "expo-linear-gradient";
import Spacer from "../../components/Spacer/spacer";
import CTAButton from "../../components/CTAButton/CTAButton";

export default function CreateRecipe() {
  const { session } = useSession();
  const navigation = useNavigation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleGoBack = () => {
    navigation.navigate("Home");
  };

  const handleCreateRecipe = async () => {
    try {
      const { data, error } = await supabase.from("recipes").upsert([
        {
          title,
          description,
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

        {/* Head Image for Recipe */}
        <Image
          source={images.CocktailImage}
          style={styles.eventImage}
          resizeMode="contain"
        />

        {/* Button with Save Icon */}
        <TouchableOpacity style={styles.emojiButton}>
          <Icons src={icons.saveIcon} dimension={30} />
        </TouchableOpacity>
      </View>
      {/* Title Input */}
      <Spacer horizontal={20} vertical={20}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#80848A"
          value={title}
          onChangeText={setTitle}
        />

        {/* Description Input */}
        <TextInput
          style={styles.input}
          placeholder="Event Description"
          placeholderTextColor="#80848A"
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <View style={styles.addIngredients}>
          <Text style={styles.addIngredientsHeadline}>Add Ingredients</Text>
          <CTAButton title={"+"} variant={"primary"} dimension={60} />
        </View>
        <Button title="Create Recipe" onPress={handleCreateRecipe} />
      </Spacer>
    </View>
  );
}

const styles = StyleSheet.create({
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
  emojiButton: {
    position: "absolute",
    right: 10,
    top: 60,
    zIndex: 2, // Ensure the button is above the image
  },
  eventImage: {
    flex: 1,
    width: "100%",
    height: 200, // Adjust the height as needed
    resizeMode: "cover",
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
  eventImage: {
    width: "100%", // Adjust as needed
    height: 280, // Adjust as needed
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
});
