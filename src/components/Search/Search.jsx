import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";

import { COLORS, icons, images } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import Icons from "../Image/icons";
import FilterItemsDiscover from "../../screens/Discover/FilterItemsDiscover";
import Spacer from "../Spacer/spacer";
import SearchResult from "./SearchResults";

export default function SearchIcon() {
  const [searchText, setSearchText] = useState("");

  const navigation = useNavigation();

  const inputRef = useRef(null);

  const handleGoBack = () => {
    navigation.navigate("Discover");
  };

  const handleTextInputChange = (text) => {
    setSearchText(text);
  };

  useEffect(() => {
    // Focus on the input field when the component mounts
    inputRef.current.focus();
  }, []);

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
  const handleEmpty = () => {
    return <Text style={styles.title}> No data present!</Text>;
  };
  return (
    <View style={styles.container}>
      <Spacer horizontal={10} vertical={60}>
        {/* First row: Back button and input */}
        <Spacer horizontal={20} vertical={0}>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
              <Icons src={icons.backArrow} dimension={20} />
            </TouchableOpacity>
            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholder="Enter username"
              placeholderTextColor="#80848A"
              onChangeText={(text) => setSearchText(text)}
              value={searchText}
            />
          </View>
        </Spacer>
        {/* Second row: FilterItemsDiscover */}
        <View style={styles.filterItemsWrapper}>
          <FilterItemsDiscover />
        </View>

        {/* Third row: Scrollable view */}
        <View style={styles.scrollViewContainer}>
          {!data && <Text> Loading</Text>}
          {data && (
            <FlatList
              data={data}
              ListEmptyComponent={handleEmpty}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <SearchResult item={item} />}
              numColumns={2}
              onRefresh={() => console.log("refreshing")}
              refreshing={false}
            />
          )}
        </View>
      </Spacer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "black",
    height: "100%",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: COLORS.primaryColour1,
    borderRadius: 20,
    flex: 1,
    marginLeft: 0,
    paddingHorizontal: 8,
    color: "#FFF",
  },
  backButton: {
    width: 50,
    zIndex: 2,
  },
  filterItemsWrapper: {
    flex: 0.15,
  },
  scrollViewContainer: {
    flex: 1,
    width: "100%",
  },
  scrollViewGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});
