import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { COLORS, icons } from "../../constants";

import Icons from "../../components/Basics/Image/icons";

export function SectionCocktailSection({ handleSectionPress }) {
  return (
    <View style={styles.RecipeSectionsContainer}>
      <TouchableOpacity
        style={styles.section}
        onPress={() => handleSectionPress("General")}
      >
        <Icons src={icons.cocktail} dimension={35} />
        <Text style={styles.Text}>General</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.section}
        onPress={() => handleSectionPress("Ingredients")}
      >
        <Icons src={icons.cocktail} dimension={35} />
        <Text style={styles.Text}>Ingredients</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.section}
        onPress={() => handleSectionPress("Mixing")}
      >
        <Icons src={icons.cocktail} dimension={35} />
        <Text style={styles.Text}>Mixing</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.section}
        onPress={() => handleSectionPress("Garnish")}
      >
        <Icons src={icons.cocktail} dimension={35} />
        <Text style={styles.Text}>Garnish</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  Text: {
    color: COLORS.fontColour,
    fontSize: 13,
  },
  RecipeSectionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  section: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
});
