import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import { COLORS, icons } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import Icons from "../Image/icons";

export default function SearchIcon() {
  const [searchText, setSearchText] = useState("");

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.navigate("Home");
  };

  const handleTextInputChange = (text) => {
    setSearchText(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
          <Icons
            src={icons.search}
            style={{
              width: 25,
              height: 25,
              tintColor: COLORS.fontColour,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  wrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  input: {
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
});
