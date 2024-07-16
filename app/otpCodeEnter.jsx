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
import Checkbox from "expo-checkbox";
import OTPTextView from "react-native-otp-textinput";

const forgotPassword = () => {
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
            Enter OTP Code 🔐
          </Text>
          <Text style={{ color: "#767676", fontSize: 14, fontWeight: "light" }}>
            Plase check your email inbox for a message from Plantify. Enter the
            one-time verification code below.
          </Text>
        </View>
        <View>
          <OTPTextView inputCount={4} />
        </View>
        <Text
          style={{
            textAlign: "center",
            marginTop: 40,
          }}
        >
          You can resend the code in{" "}
          <Text style={{ color: "#00A86B", fontWeight: "bold" }}>56</Text>{" "}
          seconds
        </Text>
        <TouchableOpacity>
          <Text
            style={{
              textAlign: "center",
              color: "#9D9E9E",
              fontWeight: "bold",
              marginTop: 20,
            }}
          >
            Resend code
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default forgotPassword;
