import { Text, StyleSheet, View, Image } from "react-native";
import { COLORS } from "../../../constants";

export default function Icons({ src, dimension, style }) {
  const styles = StyleSheet.create({
    image: {
      width: dimension,
      height: dimension,
      borderColor: COLORS.fontColour,
    },
    iconContainer: {
      ...style,
    },
  });

  return (
    <View style={styles.iconContainer}>
      <Image source={src} style={styles.image} />
    </View>
  );
}
