import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
} from "react-native";
import { supabase } from "../../config/supabaseConfig";
import { Button, Input } from "react-native-elements";
import { COLORS, images } from "../../constants";
import { LinearGradient } from "expo-linear-gradient";
import CTAButton from "../../components/CTAButton/CTAButton";
import Logo from "../../components/Image/Logo";
import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const nav = useNavigation();

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setError(true);
    }
    setLoading(false);
    nav.navigate("Home");
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.heroColour, "black"]}
        style={styles.background}
      >
        <View style={styles.wrapper}>
          <Logo dimension={150} src={images.Logo} />
          <View style={styles.mainContent}>
            {error ? (
              <Text style={styles.ErrorText}>Invalid credentials</Text>
            ) : (
              <></>
            )}
            <TextInput
              style={styles.loginTextField}
              label="Email"
              placeholder="Email"
              placeholderTextColor="#80848A"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setError(false);
              }}
              autoCapitalize="none"
              inputMode="email"
            />
            <TextInput
              style={styles.loginTextField}
              placeholder="Password"
              placeholderTextColor="#80848A"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setError(false);
              }}
              secureTextEntry
            />
          </View>
          <View style={styles.buttonContainer}>
            <CTAButton
              title="Login"
              onPress={signInWithEmail}
              variant="primary"
            />

            <Text style={styles.textSignUp}>
              Don't Have an account?{" "}
              <Text onPress={() => nav.navigate("Register")}>Sign Up</Text>
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  wrapper: {
    flex: 1,
    marginTop: 0,
    padding: 40,
  },
  loginTextField: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.accentColour1Orange,
    height: 70,
    fontSize: 30,
    marginVertical: 10,
    fontWeight: "300",
    color: "#F2BC00",
  },
  buttonContainer: {
    top: 40,
  },
  textSignUp: {
    marginTop: 20,
    color: "white",
  },
  ErrorText: {
    color: COLORS.danger,
  },
});
