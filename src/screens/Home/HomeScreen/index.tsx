import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { auth, firestore } from "../../../../firebaseConfig";

const HomeScreen = () => {
  const currentUserUID = auth.currentUser.uid;

  const [name, setName] = useState("");

  useEffect(() => {
    const getUserInfo = async () => {
      let doc = await firestore().collection("Users").doc(currentUserUID).get();

      if (!doc.exists) {
        Alert.alert("No user data found!");
      } else {
        let dataObj = doc.data();
        setName(dataObj.username);
      }
    };

    getUserInfo();
  });

  const logout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Welcome, {name} </Text>

      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
