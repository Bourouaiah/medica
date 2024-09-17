import { View, Text, Image, TouchableOpacity, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const welcomeScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        display: "flex",
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <StatusBar barStyle="dark-content" />
      <Image
        style={{
          width: 50,
          height: 41.18,
          marginVertical: 40,
          marginHorizontal: "auto",
        }}
        source={require("../assets/images/green-logo.png")}
      />
      <View style={{ marginHorizontal: "auto", gap: 5 }}>
        <Text style={{ fontSize: 28, fontWeight: "900" }}>Let's you in</Text>
      </View>
      <View
        style={{
          width: "100%",
          paddingHorizontal: 50,
          gap: 15,
          marginVertical: 40,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            borderColor: "#616161",
            borderWidth: 1,
            borderStyle: "solid",
            borderRadius: 20,
            padding: 10,
            gap: 20,
          }}
        >
          <AntDesign name="facebook-square" size={24} color="#101010" />
          <Text style={{ fontWeight: "bold" }}>Continue with Facebook</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            borderColor: "#616161",
            borderWidth: 1,
            borderStyle: "solid",
            borderRadius: 20,
            padding: 10,
            gap: 20,
          }}
        >
          <AntDesign name="google" size={24} color="#101010" />
          <Text style={{ fontWeight: "bold" }}>Continue with Google</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            borderColor: "#616161",
            borderWidth: 1,
            borderStyle: "solid",
            borderRadius: 20,
            padding: 10,
            gap: 20,
          }}
        >
          <AntDesign name="twitter" size={24} color="#101010" />
          <Text style={{ fontWeight: "bold" }}>Continue with Twitter</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: "#101010",
            marginHorizontal: 50,
            padding: 10,
            borderRadius: 20,
          }}
          onPress={() => navigation.navigate("Login")}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#ffffff",
              fontWeight: "bold",
            }}
          >
            Login in with password
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          color: "#616161",
          gap: 10,
          marginTop: 50,
        }}
      >
        <Text style={{ color: "#757575" }}>Don't have an account ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("(tabs)")}>
          <Text style={{ fontWeight: "bold" }}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default welcomeScreen;
