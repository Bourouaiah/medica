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
import { useNavigation } from "@react-navigation/native";

const Login = () => {
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
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"always"}>
        <StatusBar barStyle="dark-content" />
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={{ marginTop: 30, gap: 5 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#212121" }}>
            Welcome Back! 👋
          </Text>
          <Text style={{ color: "#767676", fontSize: 14, fontWeight: "light" }}>
            Let's Continue Your Green Journey
          </Text>
        </View>
        <View style={{ marginTop: 20, gap: 20 }}>
          <View style={{ gap: 10 }}>
            <Text
              style={{ color: "#212121", fontWeight: "bold", fontSize: 16 }}
            >
              Email
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
          <View style={{ gap: 10 }}>
            <Text
              style={{ color: "#212121", fontWeight: "bold", fontSize: 16 }}
            >
              Password
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            gap: 5,
            marginTop: 20,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Checkbox value={false} color={true ? "#00A86B" : undefined} />
            <Text style={{ color: "#212121", fontWeight: "bold" }}>
              Remember me
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("forgotPassword")}>
            <Text style={{ color: "#05AA6D", fontWeight: "bold" }}>
              Forget Password?
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: "#5F5F5F",
            fontWeight: "bold",
            marginTop: 30,
            textAlign: "center",
          }}
        >
          or
        </Text>
        <View
          style={{
            width: "100%",
            gap: 15,
            marginTop: 40,
            marginBottom: 20,
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
        <TouchableOpacity
          style={{
            backgroundColor: "#00A86B",
            padding: 10,
            borderRadius: 20,
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
            Log in
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
