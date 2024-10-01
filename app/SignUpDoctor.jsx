import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    TextInput,
    ScrollView,
  } from "react-native";
  import React, { useState } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  
  import {
    AntDesign,
    Ionicons,
    MaterialIcons,
    FontAwesome,
  } from "@expo/vector-icons";
  import { useNavigation } from "@react-navigation/native";
  import { useDispatch } from "react-redux";
  
  import { getCurrentUserData } from "../src/user/userSlice";
  import Toast from "react-native-toast-message";
  
  const SignUpDoctor = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
  
    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };
  
    const handleSignUp = () => {
      if (email == "" || password == "") {
        Toast.show({
          position: "bottom",
          type: "error",
          text1: "Error!",
          text2: "Please fill in the required data!",
        });
      } else {
        dispatch(getCurrentUserData({ email, password }));
        navigation.navigate("accountSetUpDoctor");
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
              Join Medica Today 👨‍⚕
            </Text>
            <Text style={{ color: "#767676", fontSize: 14, fontWeight: "light" }}>
              Start your appointments now!
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
                  value={email}
                  onChangeText={(value) => setEmail(value)}
                  placeholderTextColor="#9E9E9F"
                  autoCapitalize="none"
                />
              </View>
            </View>
            <View style={{ gap: 10 }}>
              <Text
                style={{ color: "black", fontWeight: "bold", fontSize: 16 }}
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
                  value={password}
                  onChangeText={(value) => setPassword(value)}
                  placeholder="Password"
                  placeholderTextColor="#9E9E9F"
                  autoCapitalize="none"
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
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
              marginTop: 20,
            }}
          >
            <Text style={{ color: "#212121" }}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={{ color: "#246BFE", fontWeight: "bold" }}>Log in</Text>
            </TouchableOpacity>
          </View>
          <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
            marginTop: 20,
          }}
        >
          <Text style={{ color: "#212121" }}>Are you a patient?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={{ color: "#246BFE", fontWeight: "bold" }}>Register as a patient</Text>
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
            onPress={handleSignUp}
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
        </ScrollView>
        <Toast />
      </SafeAreaView>
    );
  };
  
  export default SignUpDoctor;
  