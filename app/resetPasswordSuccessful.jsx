import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
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
      <StatusBar barStyle="dark-content" />
      <View style={{ marginTop: 80, gap: 5, alignItems: "center" }}>
        <Text style={{ fontSize: 40 }}>✅🪴</Text>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#212121" }}>
          You're All Set!
        </Text>
        <Text style={{ color: "#767676", fontSize: 14, fontWeight: "light" }}>
          Your garden has been updated.
        </Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "#00A86B",
          padding: 10,
          borderRadius: 20,
          marginTop: 80,
        }}
        onPress={() => navigation.navigate("(tabs)")}
      >
        <Text
          style={{
            textAlign: "center",
            color: "#ffffff",
            fontWeight: "bold",
          }}
        >
          Go to Homepage
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default forgotPassword;
