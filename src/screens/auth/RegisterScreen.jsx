import React, { useState } from "react";
import { Alert, StyleSheet, View, Text, TextInput } from "react-native";
import { supabase } from "../../config/supabaseConfig";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import CTAButton from "../../components/Basics/CTAButton/CTAButton";
import { COLORS, images } from "../../constants";
import Logo from "../../components/Basics/Image/Logo";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const nav = useNavigation();

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp(
      {
        email: email,
        password: password,
      },
      {
        data: {
          first_name: username,
          age: 27,
        },
      }
    );

    if (error) Alert.alert(error.message);

    setLoading(false);
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
            <TextInput
              style={styles.loginTextField}
              label="Name"
              placeholder="Username"
              placeholderTextColor="#80848A"
              value={username}
              onChangeText={(text) => setUsername(text)}
              autoCapitalize="none"
              inputMode="email"
            />
            <TextInput
              style={styles.loginTextField}
              label="Email"
              placeholder="Email"
              placeholderTextColor="#80848A"
              value={email}
              onChangeText={(text) => setEmail(text)}
              autoCapitalize="none"
              inputMode="email"
            />
            <TextInput
              style={styles.loginTextField}
              placeholder="Password"
              placeholderTextColor="#80848A"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />
          </View>
          <View style={styles.buttonContainer}>
            <CTAButton
              title="Login"
              onPress={signUpWithEmail}
              variant="primary"
              height={50}
            />

            <Text style={styles.textSignUp}>
              Have an account?{" "}
              <Text onPress={() => nav.navigate("Login")}>Sign In</Text>
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
    color: COLORS.fontColour,
    textDecorationLine: "none",
  },
  buttonContainer: {
    top: 40,
  },
  textSignUp: {
    marginTop: 20,
    color: "white",
  },
});
