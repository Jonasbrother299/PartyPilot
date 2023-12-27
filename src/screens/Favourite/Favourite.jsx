import {
  Text,
  StyleSheet,
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS, images } from "../../constants";
import { LinearGradient } from "expo-linear-gradient";
import { supabase } from "../../config/supabaseConfig";
import Spacer from "../../components/Basics/Spacer/spacer";
import Icons from "../../components/Basics/Image/icons";
import { useSession } from "../../hooks/useSession";

export default function Favourite() {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { session } = useSession();

  const currentUserId = session.user.id;

  const sendFriendRequest = async (receiverId) => {
    try {
      // Check if a friend request already exists
      const { data: existingRequests, error } = await supabase
        .from("friend_requests")
        .select()
        .eq("sender_id", currentUserId)
        .eq("receiver_id", receiverId);

      if (error) {
        console.error(
          "Error checking existing friend requests:",
          error.message
        );
        return;
      }

      if (existingRequests.length === 0) {
        // If no existing request, create a new friend request
        const { data, error } = await supabase.from("friend_requests").upsert(
          [
            {
              sender_id: currentUserId,
              receiver_id: receiverId,
              status: "pending",
            },
          ],
          { onConflict: ["sender_id", "receiver_id"] }
        );

        if (error) {
          console.error("Error sending friend request:", error.message);
        } else {
          console.log("Friend request sent successfully!");
        }
      } else {
        console.log("Friend request already sent or accepted.");
      }
    } catch (error) {
      console.error("Error sending friend request:", error.message);
    }
  };
  useEffect(() => {
    // Function to fetch user profiles from Supabase based on search text
    const fetchUserProfiles = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .ilike("username", `${searchText}%`);

      if (error) {
        console.error("Error fetching user profiles:", error.message);
      } else {
        setSearchResults(data || []);
      }
    };

    // Call the function when searchText changes
    if (searchText.trim() !== "") {
      fetchUserProfiles();
    } else {
      // Clear results if search text is empty
      setSearchResults([]);
    }
  }, [searchText]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.heroColour, "black"]}
        style={styles.background}
      ></LinearGradient>
      <Spacer vertical={30} horizontal={20}>
        <Text>Favourite</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter username"
          placeholderTextColor="#80848A"
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
        />
        {/* Display search results using FlatList */}
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            // console.log(item.avatar_url);
            const completeAvatarUrl = `https://gxpswfomuonmydpsyenb.supabase.co/storage/v1/object/public/avatars/${item.avatar_url}`;

            console.log(completeAvatarUrl);
            return (
              <View style={styles.profileItem}>
                {item.avatar_url ? (
                  <Image
                    source={{ uri: completeAvatarUrl }}
                    style={styles.image}
                  />
                ) : (
                  <Image source={images.profile} style={styles.image} />
                )}
                <Text style={styles.username}>{item.username}</Text>
                <TouchableOpacity
                  title="Send Friend Request"
                  onPress={() => sendFriendRequest(item.id)}
                >
                  <Icons src={images.CocktailImage} dimension={100} />
                </TouchableOpacity>
              </View>
            );
          }}
        />
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
  profileItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  input: {
    height: 70,
    fontSize: 18,
    padding: 10,
    color: COLORS.fontColour,
  },
  username: {
    fontSize: 18,
    color: COLORS.fontColour,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
