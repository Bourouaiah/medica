import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  AntDesign,
  Ionicons,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const forgotPassword = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        display: "flex",
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={"always"}
      >
        <StatusBar barStyle="dark-content" />
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={{ marginTop: 30, gap: 5 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#212121" }}>
            Forgot Your Password? 🔑
          </Text>
          <Text style={{ color: "#767676", fontSize: 14, fontWeight: "light" }}>
            Enter the email address associated with your Plantify account. We'll
            send you a one-time verification code to reset your password.
          </Text>
        </View>
        <View style={{ marginTop: 20, gap: 20 }}>
          <View style={{ gap: 10 }}>
            <Text
              style={{ color: "#212121", fontWeight: "bold", fontSize: 16 }}
            >
              Your Registered Email
            </Text>
            <View
              style={{
                backgroundColor: "#FAFAFA",
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
                gap: 10,
                borderRadius: 10,
              }}
            >
              <MaterialIcons name="email" size={24} color="black" />
              <TextInput
                style={{ color: "#212121", flex: 1 }}
                keyboardType="email-address"
                placeholder="Email"
                placeholderTextColor="#9E9E9F"
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#00A86B",
            padding: 10,
            borderRadius: 20,
            marginTop: 80,
          }}
          onPress={() => navigation.navigate("secureAccount")}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#ffffff",
              fontWeight: "bold",
            }}
          >
            Sent OTP Code
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default forgotPassword;
