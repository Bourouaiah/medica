import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  AntDesign,
  Ionicons,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";

import { dealsData } from "../data";
import { addDoc, collection } from "firebase/firestore";

const Login = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (email == "" || password == "") {
      Toast.show({
        position: "bottom",
        type: "error",
        text1: "Error!",
        text2: "Please fill in the required data!",
      });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          setLoading(true);
        })
        .then(() => {
          setEmail("");
          setPassword("");
        })
        .then(() => {
          navigation.navigate("(tabs)");
        })
        .finally(() => {
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          Toast.show({
            position: "bottom",
            type: "error",
            text1: "Error!",
            text2: "Email or password are wrong!",
          });
        });
    }
  };

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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={{ marginTop: 30, gap: 5 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#212121" }}>
            Welcome Back! 👋
          </Text>
          <Text style={{ color: "#767676", fontSize: 14, fontWeight: "light" }}>
            Let's see new cars today.
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
              <MaterialIcons name="email" size={24} color="#246BFE" />
              <TextInput
                style={{ color: "#212121", flex: 1 }}
                keyboardType="email-address"
                placeholder="Email"
                autoCapitalize="none"
                value={email}
                onChangeText={(value) => setEmail(value)}
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
              <FontAwesome name="lock" size={24} color="#246BFE" />
              <TextInput
                style={{ color: "#212121", flex: 1 }}
                secureTextEntry={!showPassword}
                placeholder="Password"
                autoCapitalize="none"
                value={password}
                onChangeText={(value) => setPassword(value)}
                placeholderTextColor="#9E9E9F"
              />
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color="#246BFE"
                />
              </TouchableOpacity>
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
            <Checkbox value={false} color={true ? "#101010" : undefined} />
            <Text style={{ color: "#212121", fontWeight: "bold" }}>
              Remember me
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("forgotPassword")}
          >
            <Text style={{ color: "#101010", fontWeight: "bold" }}>
              Forget Password?
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            marginVertical: 30
          }}
        >
          <Text style={{ color: "#424242" }}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={{ fontWeight: "bold", color: "#246BFD" }}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: "#5F5F5F",
            fontWeight: "bold",
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
            <AntDesign name="google" size={24} color="#246BFE" />
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
            <AntDesign name="apple1" size={24} color="#246BFE" />
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
            <AntDesign name="facebook-square" size={24} color="#246BFE" />
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
            <AntDesign name="twitter" size={24} color="#246BFE" />
            <Text style={{ fontWeight: "bold" }}>Continue with Twitter</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#246BFE",
            padding: 10,
            borderRadius: 20,
          }}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text
              style={{
                textAlign: "center",
                color: "#ffffff",
                fontWeight: "bold",
              }}
            >
              Log in
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};

export default Login;
