import React from "react";
import { View, StyleSheet } from "react-native";

const Spacer = ({ children, horizontal = 0, vertical = 0 }) => {
  const styles = StyleSheet.create({
    spacer: {
      marginHorizontal: horizontal,
      marginVertical: vertical,
    },
  });

  return <View style={styles.spacer}>{children}</View>;
};

export default Spacer;
