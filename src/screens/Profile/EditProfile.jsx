import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { COLORS, SIZES, images, icons } from "../../constants";
import { LinearGradient } from "expo-linear-gradient";
import { useSession } from "../../hooks/useSession";
import { supabase } from "../../config/supabaseConfig";
import CTAButton from "../../components/Basics/CTAButton/CTAButton";
import Background from "../../components/Basics/Image/Background";
import ProfilPictureUplaod from "../../components/ProfileImage/ProfilPictureUplaod";
import Icons from "../../components/Basics/Image/icons";
import { useNavigation } from "@react-navigation/native";
import Spacer from "../../components/Basics/Spacer/spacer";

export default function EditProfile() {
  const { session } = useSession();
  const [profile, setProfile] = useState(null);
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <Background src={images.Background} style={styles.backgroundImage} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Icons src={icons.backArrow} dimension={20} />
        </TouchableOpacity>
      </View>
      {/* <LinearGradient
        colors={[COLORS.heroColour, "black"]}
        style={styles.background}
      ></LinearGradient> */}
      <ProfilPictureUplaod
        dimension={150}
        styleContainer={{ alignItems: "center" }}
      />
      <View style={styles.iconContainer}>
        <Icons
          src={icons.kamera}
          dimension={25}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </View>

      <Spacer horizontal={30} vertical={40}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#80848A"
          // value={title}
          // onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#80848A"
          // value={title}
          // onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          placeholderTextColor="#80848A"
          // value={title}
          // onChangeText={setTitle}
        />
        <CTAButton
          title={"Update"}
          // onPress={}
          variant={"primary"}
          height={60}
          width={"100%"}
        />
      </Spacer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center", // Center the content vertically
    alignItems: "center",
    backgroundColor: COLORS.primaryColour1,
    borderRadius: 40,
  },
  iconContainer: {
    position: "absolute",
    top: 120,
    right: 140,
    width: 50,
    height: 50,
    backgroundColor: COLORS.primaryColour1,
    borderRadius: 60,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.accentColour1Orange,
    height: 50,
    fontSize: 24,
    marginVertical: 10,
    fontWeight: "300",
    color: "white",
  },
});
