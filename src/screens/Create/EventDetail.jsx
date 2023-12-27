import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

import { useSession } from "../../hooks/useSession";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import { COLORS, SIZES, icons } from "../../constants";
import Icons from "../../components/Basics/Image/icons";
import Spacer from "../../components/Basics/Spacer/spacer";

export default function CreateEvent({ route }) {
  const { event } = route.params;
  console.log(event);
  const { session } = useSession();
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.heroColour, "black"]}
        style={styles.background}
      ></LinearGradient>

      <View style={styles.wrapper}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Icons src={icons.backArrow} dimension={20} />
        </TouchableOpacity>
      </View>
      <Text style={styles.eventHeadline}>{event.title}</Text>
      <Spacer></Spacer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  wrapper: {
    marginTop: 30,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  eventHeadline: {
    color: COLORS.fontColour,
    fontSize: SIZES.large,
  },
});
