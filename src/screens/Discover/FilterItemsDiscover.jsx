import React from "react";
import { View, FlatList, Text, StyleSheet, Image } from "react-native";
import { images } from "../../constants";
import { LinearGradient } from "expo-linear-gradient";

const data = [
  { id: 1, image: images.CocktailImage, text: "Summer drink" },
  { id: 2, image: images.CocktailImage, text: "Winter Drink" },
  { id: 3, image: images.CocktailImage, text: "Text 3" },
  { id: 4, image: images.CocktailImage, text: "Text 4" },
  { id: 5, image: images.CocktailImage, text: "Text 5" },
  { id: 6, image: images.CocktailImage, text: "Text 6" },
  { id: 7, image: images.CocktailImage, text: "Text 7" },
  { id: 8, image: images.CocktailImage, text: "Text 8" },
  { id: 9, image: images.CocktailImage, text: "Text 9" },
];

export default function FilterItemsDiscover() {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <View style={styles.imageContainer}>
            <Image source={item.image} style={styles.image} />
            <LinearGradient
              colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.6)"]}
              locations={[0.4, 0.9]}
              style={styles.gradient}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        </View>
      )}
      horizontal={true}
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      snapToAlignment="start"
      snapToInterval={220}
      decelerationRate="fast"
      initialScrollIndex={0}
      getItemLayout={(data, index) => ({
        length: 300,
        offset: 300 * index,
        index,
      })}
    />
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    width: 120,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginHorizontal: 20,
    marginVertical: 5,
  },
  imageContainer: {
    flex: 1,
    position: "relative",
    width: "100%",
    height: "100%",
    borderRadius: 20,
    overflow: "hidden", // Clip the image to the borderRadius
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  textContainer: {
    position: "absolute",
    bottom: 15,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 10,
    fontSize: 14,
    color: "white",
  },
});
