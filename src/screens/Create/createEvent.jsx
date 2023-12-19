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

export default function CreateEvent() {
  const { session } = useSession();
  const navigation = useNavigation();
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);

  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate()),
    "YYYY/MM/DD"
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [startedDate, setStartedDate] = useState("12/12/2023");

  const handleGoBack = () => {
    navigation.goBack();
  };

  function handleChangeStartDate(propDate) {
    setStartedDate(propDate);
  }

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };

  const handleCreateEvent = async () => {
    try {
      const { data, error } = await supabase.from("events").upsert([
        {
          title,
          description,
          location,
          date: selectedStartDate,
          admin: session.user.id, // Set the 'admin' field based on the user's role
        },
      ]);

      if (error) {
        console.error("Error creating event:", error);
      } else {
        console.log("Event created successfully", data);
        navigation.navigate("Home"); // Replace 'Home' with the actual name of your home screen
      }
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.heroColour, "black"]}
        style={styles.background}
      ></LinearGradient>

      <View style={styles.wrapper}>
        {/* Back Button */}

        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Icons src={icons.backArrow} dimension={20} />
        </TouchableOpacity>

        {/* Image */}
        <Image source={images.Logo} style={styles.eventImage} />

        {/* Button with Emoji Herz */}
        <TouchableOpacity style={styles.emojiButton}>
          <Icons src={images.Logo} dimension={20} />
        </TouchableOpacity>
      </View>
      {/* Title Input */}
      <Spacer horizontal={20} vertical={20}>
        <TextInput
          style={styles.input}
          placeholder="Event Title"
          placeholderTextColor="#80848A"
          value={title}
          onChangeText={setTitle}
        />

        {/* Description Input */}
        <TextInput
          style={styles.input}
          placeholder="Event Description"
          placeholderTextColor="#80848A"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <TextInput
          style={styles.input}
          placeholder="Event Location"
          placeholderTextColor="#80848A"
          value={location}
          onChangeText={setLocation}
          multiline
        />
        <TouchableOpacity
          style={styles.inputBtn}
          onPress={handleOnPressStartDate}
        >
          <Text style={styles.selectedStartDate}>{selectedStartDate}</Text>
        </TouchableOpacity>

        <Button title="Create Event" onPress={handleCreateEvent} />

        <Modal
          animationType="slide"
          transparent={true}
          visible={openStartDatePicker}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <DatePicker
                mode="calendar"
                minimumDate={startDate}
                selected={startedDate}
                onDateChanged={handleChangeStartDate}
                onSelectedChange={(date) => setSelectedStartDate(date)}
                options={{
                  backgroundColor: "#080516",
                  textHeaderColor: COLORS.accentColour3Blue,
                  textDefaultColor: COLORS.fontColour,
                  selectedTextColor: "#FFFFFF",
                  mainColor: COLORS.accentColour3Blue,
                  textSecondaryColor: "#FFFFFF",
                  borderColor: "rgba(122, 146, 165, 0.1)",
                }}
              />
              <TouchableOpacity onPress={handleOnPressStartDate}>
                <Text style={{ color: "white" }}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </Spacer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.heroColour,
    width: "100%",
    height: "100%",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 10,
    top: 10,
    zIndex: 2, // Ensure the back button is above the image
  },
  eventImage: {
    flex: 1,
    width: "100%",
    height: 200, // Adjust the height as needed
    resizeMode: "cover",
  },
  emojiButton: {
    position: "absolute",
    right: 10,
    top: 10,
    zIndex: 2, // Ensure the button is above the image
  },
  headline: {
    fontSize: SIZES.xxLarge,
    color: COLORS.fontColour,
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.accentColour1Orange,
    height: 70,
    fontSize: 30,
    marginVertical: 10,
    fontWeight: "300",
    color: "white",
  },
  inputBtn: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.accentColour1Orange,
    marginVertical: 10,
    borderRadius: 4,
    height: 50,
    paddingLeft: 8,
    fontSize: 18,
    justifyContent: "center",
    marginTop: 14,
  },
  submitBtn: {
    backgroundColor: "#342342",
    paddingVertical: 22,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 12,
    marginVertical: 16,
  },
  selectedStartDate: {
    fontSize: SIZES.medium,
    color: COLORS.fontColour,
  },
  eventImage: {
    width: "100%",
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#080516",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 35,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
