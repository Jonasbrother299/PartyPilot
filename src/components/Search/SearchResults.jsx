import { View, Text, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function SearchResult({ item }) {
  return (
    <View style={styles.resultContainer}>
      <Image source={item.image} style={styles.image} />
      <LinearGradient
        colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.9)"]}
        locations={[0, 0.5]}
        style={styles.gradient}
      />
      <View style={styles.overlay}>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  resultContainer: {
    position: "relative",
  },
  image: {
    width: 150,
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 8,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 30,
  },
  text: {
    color: "white",
    textAlign: "center",
  },
});
