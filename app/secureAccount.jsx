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
            Secure Your Account 🔒
          </Text>
          <Text style={{ color: "#767676", fontSize: 14, fontWeight: "light" }}>
            Almost there! Create a new password for your Plantify account to
            keep it secure. Remember to choose a strong and unique password.
          </Text>
        </View>
        <View style={{ gap: 10, marginTop: 20 }}>
          <View style={{ gap: 10 }}>
            <Text
              style={{ color: "#212121", fontWeight: "bold", fontSize: 16 }}
            >
              New Password
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
              <FontAwesome name="lock" size={24} color="black" />
              <TextInput
                style={{ color: "#212121", flex: 1 }}
                secureTextEntry={true}
                placeholder="Password"
                placeholderTextColor="#9E9E9F"
              />
              <Ionicons name="eye-off" size={24} color="black" />
            </View>
          </View>
          <View style={{ gap: 10 }}>
            <Text
              style={{ color: "#212121", fontWeight: "bold", fontSize: 16 }}
            >
              Confirm New Password
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
              <FontAwesome name="lock" size={24} color="black" />
              <TextInput
                style={{ color: "#212121", flex: 1 }}
                secureTextEntry={true}
                placeholder="Password"
                placeholderTextColor="#9E9E9F"
              />
              <Ionicons name="eye-off" size={24} color="black" />
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
          onPress={() => navigation.navigate("resetPasswordSuccessful")}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#ffffff",
              fontWeight: "bold",
            }}
          >
            Save New Password
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default forgotPassword;
