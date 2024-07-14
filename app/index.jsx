import { View, Text, StatusBar, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

import { AntDesign } from "@expo/vector-icons";

const welcomeScreen = () => {
  return (
    <SafeAreaView
      style={{
        display: "flex",
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor={"#000000"} />
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
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>
          Let's Get Started
        </Text>
        <Text style={{ color: "#616161", fontSize: 12, marginHorizontal: "auto" }}>
          Let's dive into your account
        </Text>
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
          <AntDesign name="google" size={24} color="#00A86B" />
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
          <AntDesign name="apple1" size={24} color="#00A86B" />
          <Text style={{ fontWeight: "bold" }}>Continue with Apple</Text>
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
          <AntDesign name="facebook-square" size={24} color="#00A86B" />
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
          <AntDesign name="twitter" size={24} color="#00A86B" />
          <Text style={{ fontWeight: "bold" }}>Continue with Twitter</Text>
        </View>
      </View>
      <View style={{ gap: 15 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#00A86B",
            marginHorizontal: 50,
            padding: 10,
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#ffffff",
              fontWeight: "bold",
            }}
          >
            Sign up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#FAFAFA",
            marginHorizontal: 50,
            padding: 10,
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#00A86B",
              fontWeight: "bold",
            }}
          >
            Log in
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
          marginTop: 50
        }}
      >
        <Text>Privacy Ploicy</Text>
        <Text>|</Text>
        <Text>Terms of service</Text>
      </View>
    </SafeAreaView>
  );
};

export default welcomeScreen;
