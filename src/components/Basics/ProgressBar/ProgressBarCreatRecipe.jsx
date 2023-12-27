import { StyleSheet, View, Animated } from "react-native";
import { COLORS } from "../../../constants";

export default function ProgressBarCreatRecipe({ progress }) {
  return (
    <View style={styles.progressBarContainer}>
      <Animated.View
        style={{
          height: "100%",
          backgroundColor: COLORS.accentColour3Blue,
          width: progress,
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  progressBarContainer: {
    width: "100%",
    height: 10,
    backgroundColor: COLORS.primaryColour2,
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 50,
  },
});
