import { View, Text, Image, TouchableOpacity, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

import { useNavigation } from "@react-navigation/native";

const welcomeScreen = () => {
  const navigation = useNavigation();
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
      <Text style={{ fontSize: 22, color: "#246BFD", fontWeight: "bold", marginTop: 40, marginBottom: 10 }}>
        Welcome to Medica! 👋
      </Text>
      <Text style={{ textAlign: "center", color: "#212121" }}>
        The best online doctor appintment & consultation app of the century for
        your health and medical needs!
      </Text>
      <Text onPress={() => navigation.navigate("(tabs)")}>Next</Text>
    </SafeAreaView>
  );
};

export default welcomeScreen;
