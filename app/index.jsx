import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect } from "react";

import { CommonActions, useNavigation } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const welcomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "(tabs)" }],
          })
        );
      } else {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Login" }],
          })
        );
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  return (
    <SafeAreaView
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 30,
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <StatusBar barStyle="dark-content" />
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Image
          style={{ width: 40, height: 40 }}
          source={require("../assets/images/logo.png")}
        />
        <Text style={{ fontSize: 28, fontWeight: "bold" }}>Medica</Text>
      </View>
      <Text
        style={{
          fontSize: 22,
          color: "#246BFD",
          fontWeight: "bold",
          marginTop: 40,
          marginBottom: 10,
        }}
      >
        Welcome to Medica! 👋
      </Text>
      <Text style={{ textAlign: "center", color: "#212121" }}>
        The best online doctor appintment & consultation app of the century for
        your health and medical needs!
      </Text>
      <ActivityIndicator
        style={{ marginTop: 20 }}
        size="small"
        color="#246BFD"
      />
    </SafeAreaView>
  );
};

export default welcomeScreen;
