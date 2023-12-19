import React, { useState } from "react";
import {
  Text,
  TextInput,
  Button,
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import { COLORS, SIZES, images, icons } from "../../constants";
import DatePicker from "react-native-modern-datepicker";
import { getFormatedDate } from "react-native-modern-datepicker";
import { supabase } from "../../config/supabaseConfig";
import { useSession } from "../../hooks/useSession";
import { useNavigation } from "@react-navigation/native";
import Icons from "../../components/Image/icons";
import { LinearGradient } from "expo-linear-gradient";
import Spacer from "../../components/Spacer/spacer";

export default function CreateEvent({ route }) {
  const { event } = route.params;
  console.log(event);
  const { session } = useSession();
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleCreateEvent = async () => {};

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
