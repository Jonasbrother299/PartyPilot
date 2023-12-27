import React from "react";
import { View, StyleSheet } from "react-native";

const Spacer = ({ children, horizontal = 0, vertical = 0, top = 0 }) => {
  const styles = StyleSheet.create({
    spacer: {
      marginTop: top,
      marginHorizontal: horizontal,
      marginVertical: vertical,
    },
  });

  return <View style={styles.spacer}>{children}</View>;
};

export default Spacer;
