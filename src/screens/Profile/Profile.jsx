import React, { useCallback, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import { useSession } from "../../hooks/useSession";
import { supabase } from "../../config/supabaseConfig";
import { useFocusEffect } from "@react-navigation/native";
import { COLORS, SIZES, icons, images } from "../../constants";
import Spacer from "../../components/Basics/Spacer/spacer";
import Background from "../../components/Basics/Image/Background";
import Icons from "../../components/Basics/Image/icons";
import ProfileImage from "../../components/ProfileImage/ProfileImage";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
  const { session } = useSession();
  // console.log(session.user.user_metadata.username);
  const [profile, setProfile] = useState(null);
  const [userRecipes, setUserRecipes] = useState([]);
  const navigation = useNavigation();
  function goToEditProfile() {
    navigation.navigate("EditProfile");
  }

  useFocusEffect(
    useCallback(() => {
      // Fetch recipes when the screen gains focus
      fetchProfile();
    }, [])
  );

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error.message);
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Background src={images.Background} style={styles.backgroundImage} />

      {/* <LinearGradient
        colors={[COLORS.heroColour, "black"]}
        style={styles.background}
      ></LinearGradient> */}
      <Spacer top={20}>
        <ProfileImage dimension={150} />
      </Spacer>
      <TouchableOpacity
        onPress={goToEditProfile}
        style={styles.buttonContainer}
      >
        <Icons dimension={30} src={icons.edit} />
      </TouchableOpacity>
      <View style={styles.profileInfo}>
        {profile && (
          <>
            <Text style={styles.usernameText}>
              Username: {profile.username}
            </Text>
            <Spacer vertical={40} horizontal={0}>
              <View style={styles.containerInfo__user}>
                <View style={styles.containerInfo__user__grid}>
                  <Text style={styles.numberText}>
                    2{/* {profile.eventsCreated} */}
                  </Text>
                  <Text style={styles.statusText}>Event Created</Text>
                </View>

                <View style={styles.containerInfo__user__grid}>
                  <Text style={styles.numberText}>
                    3{/* {profile.eventsAttending} */}
                  </Text>
                  <Text style={styles.statusText}>Event Attending</Text>
                </View>
              </View>
            </Spacer>
          </>
        )}
      </View>
      <Button
        title="Sign Out"
        onPress={() => supabase.auth.signOut()}
        buttonStyle={styles.signOutButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
    justifyContent: "flex-end",
    alignItems: "center",
  },
  containerInfo__user: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 60,
  },
  containerInfo__user__grid: {
    alignItems: "center",
  },
  numberText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.fontColour,
  },
  statusText: {
    fontSize: 18,
    color: COLORS.fontColour,
  },

  wrapper: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    paddingTop: 30,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  profileInfo: {
    alignItems: "center",
  },
  usernameText: {
    fontSize: SIZES.medium,
    color: COLORS.fontColour,
  },
  resultContainer: {
    width: "50%",
    marginTop: 30,
  },
  eventItem: {
    flex: 1,
    marginBottom: 20,
    overflow: "hidden",
    borderColor: COLORS.primaryColour1, // Add border color
    borderWidth: 1, // Add border width
    marginHorizontal: 10,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
  },
  overlay: {
    width: "100%",
    backgroundColor: COLORS.primaryColour1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 8,
  },
});
