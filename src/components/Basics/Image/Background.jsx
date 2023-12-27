import { StyleSheet, Image } from "react-native";

export default function Background({ src, style }) {
  const styles = StyleSheet.create({
    image: {
      width: "100%",
      height: "100%",
      ...style,
    },
  });

  return <Image source={src} style={styles.image} />;
}
