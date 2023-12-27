import { TouchableOpacity, Text, StyleSheet } from "react-native";

import { COLORS } from "../../../constants";

export default function CTAButton({ title, onPress, variant, height, width }) {
  const styles = StyleSheet.create({
    containerPrimary: {
      height: height,
      width: width,
      backgroundColor: COLORS.accentColour1Orange,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
    },
    containerSecondary: {
      height: height,
      width: width,
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
    },
    textPrimary: {
      fontSize: 15,
      fontWeight: "bold",
      color: "white",
    },
    textSecondary: {
      fontSize: 15,
      fontWeight: "bold",
      color: "white",
    },
  });

  const containerStyle =
    variant === "primary" ? styles.containerPrimary : styles.containerSecondary;

  const textStyle =
    variant === "primary" ? styles.textPrimary : styles.textSecondary;

  return (
    <TouchableOpacity onPress={onPress} style={containerStyle}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}
