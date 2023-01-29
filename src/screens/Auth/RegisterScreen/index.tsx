import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { auth, firestore } from "../../../../firebaseConfig";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const register = async () => {
    if (!username) {
      Alert.alert("Name field is required");
      return;
    }

    if (!email) {
      Alert.alert("Email field is required!");
      return;
    }

    if (!password) {
      Alert.alert("Password field is required");
      return;
    }

    if (!confirmPassword) {
      Alert.alert("Confirm password field is required");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password and confirm password does not match");
      return;
    }

    try {
      await auth.createUserWithEmailAndPassword(email, password);
      const currentUser = auth.currentUser;

      await firestore().collection("Users").doc(currentUser.uid).set({
        email,
        username,
      });
    } catch (e) {
      Alert.alert(e.message);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={username}
          autoCapitalize="none"
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          autoCapitalize="none"
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={register} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    marginBottom: 20,
    backgroundColor: "white",
    borderColor: "#b1b1b1",
    borderWidth: 1,
    borderRadius: 100,
    borderStyle: "solid",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#0782f9",
    width: "100%",
    padding: 15,
    borderRadius: 100,
    alignItems: "center",
    borderColor: "#0782f9",
    borderWidth: 1,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
  },
});
