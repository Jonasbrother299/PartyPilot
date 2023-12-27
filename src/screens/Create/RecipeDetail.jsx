import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
} from "react-native";
import { useSession } from "../../hooks/useSession";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import { COLORS, SIZES, icons, images } from "../../constants";
import Icons from "../../components/Basics/Image/icons";
import Spacer from "../../components/Basics/Spacer/spacer";

export default function CreateEvent({ route }) {
  const { recipe } = route.params;
  const { session } = useSession();
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.heroColour, "black"]}
        style={styles.background}
      ></LinearGradient>

      <Image
        source={{ uri: recipe.image }}
        style={styles.recipeImage}
        resizeMode="cover"
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Icons src={icons.backArrow} dimension={20} />
        </TouchableOpacity>

        {/* Button with Save Icon */}
        <TouchableOpacity style={styles.saveButton}>
          <Icons src={icons.saveIcon} dimension={30} />
        </TouchableOpacity>
      </View>
      <Animated.View>
        <ScrollView style={styles.contentContainer}>
          {/* Head Image for Recipe */}
          <Spacer top={20} horizontal={20}>
            <Text style={styles.eventHeadline}>{recipe.title}</Text>
            <Text style={styles.eventHeadline}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum quo
              unde aut quod distinctio reprehenderit modi similique! Dolorum
              doloribus sapiente, tempora consequuntur, architecto nihil a
              incidunt quasi fuga nulla ut.
            </Text>
            <Text style={styles.eventHeadline}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum quo
              unde aut quod distinctio reprehenderit modi similique! Dolorum
              doloribus sapiente, tempora consequuntur, architecto nihil a
              incidunt quasi fuga nulla ut.
            </Text>
            <Text style={styles.eventHeadline}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum quo
              unde aut quod distinctio reprehenderit modi similique! Dolorum
              doloribus sapiente, tempora consequuntur, architecto nihil a
              incidunt quasi fuga nulla ut.
            </Text>
          </Spacer>
        </ScrollView>
      </Animated.View>
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
  recipeImage: {
    width: "100%",
    height: "50%", // Adjust the height as needed
  },
  buttonContainer: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center", // Center the content vertically
    alignItems: "center",
    backgroundColor: COLORS.primaryColour1,
    borderRadius: 40,
  },
  saveButton: {
    width: 40,
    height: 40,
  },
  contentContainer: {
    backgroundColor: COLORS.black,
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20, // Adj
  },
  eventHeadline: {
    color: COLORS.fontColour,
    fontSize: SIZES.large,
  },
});
