import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../../../firebaseConfig";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Home");
      } else {
        navigation.navigate("Login");
      }
    });

    return unsubscribe;
  }, []);

  const sendForm = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      Alert.alert(error);
    }
  };

  const register = () => {
    navigation.navigate("Register");
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          textContentType="emailAddress"
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
        />
        <TextInput
          textContentType="password"
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          autoCapitalize="none"
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={sendForm} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={register}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
  buttonOutline: {
    backgroundColor: "white",
    borderColor: "#0782f9",
    borderWidth: 1,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
  },
  buttonOutlineText: {
    color: "#0782f9",
    fontWeight: "700",
  },
});
