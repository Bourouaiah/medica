import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import * as ImagePicker from "expo-image-picker";

import userFetchUser from "../../../custom-hooks/useFetchUser";
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useUserContext } from "../../../UserContext";
import { auth } from "../../../firebase";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";

const index = () => {
  const navigation = useNavigation();
  const { userDoc } = userFetchUser();

  const { loading } = useUserContext();

  const [profilePicture, setProfilePicture] = useState(null);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: "Login",
              },
            ],
          })
        );
      })
      .catch((error) => {
        Toast.show({
          position: "bottom",
          type: "error",
          text1: "Error!",
          text2: "Please fill in the required data!",
        });
      });
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}
    >
      <StatusBar barStyle="dark-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={"always"}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Image
            style={{ width: 30, height: 30 }}
            source={require("../../../assets/images/logo.png")}
          />
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Profile</Text>
        </View>
        {loading ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 100,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              Loading data ...
            </Text>
            <Image
              style={{ width: 100, height: 100 }}
              source={require("../../../assets/images/loading-doctor.gif")}
            />
          </View>
        ) : (
          <>
            <View
              style={{
                position: "relative",
                marginHorizontal: "auto",
                marginVertical: 20,
              }}
            >
              {!userDoc?.profilePicture ? (
                <Image
                  style={{ width: 100, height: 100, borderRadius: 200 }}
                  source={require("../../../assets/images/empty-profile-picture.png")}
                />
              ) : (
                <Image
                  style={{ width: 100, height: 100, borderRadius: 200 }}
                  source={{ uri: userDoc?.profilePicture }}
                />
              )}
              <TouchableOpacity
                style={{
                  backgroundColor: "#246BFD",
                  borderRadius: 10,
                  padding: 3,
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                }}
                onPress={pickImage}
              >
                <MaterialIcons name="edit" size={20} color="white" />
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center", gap: 10, marginBottom: 20 }}>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                {userDoc?.name}
              </Text>
              <Text>{userDoc?.phoneNumber}</Text>
            </View>
            <View
              style={{
                paddingTop: 20,
                borderTopColor: "#EEEEEE",
                borderTopWidth: 1,
                borderTopStyle: "solid",
                gap: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <AntDesign name="user" size={24} color="black" />
                  <Text>Edit profile</Text>
                </View>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  color="black"
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <MaterialIcons
                    name="notifications-none"
                    size={24}
                    color="black"
                  />
                  <Text>Notifications</Text>
                </View>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  color="black"
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <MaterialIcons name="payment" size={24} color="black" />
                  <Text>Payment</Text>
                </View>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  color="black"
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <MaterialIcons name="security" size={24} color="black" />
                  <Text>Security</Text>
                </View>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  color="black"
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <FontAwesome name="language" size={24} color="black" />
                  <Text>Language</Text>
                </View>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  color="black"
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <MaterialIcons name="dark-mode" size={24} color="black" />
                  <Text>Dark mode</Text>
                </View>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  color="black"
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Ionicons name="help-circle-outline" size={24} color="black" />
                  <Text>Help center</Text>
                </View>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  color="black"
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <AntDesign name="addusergroup" size={24} color="black" />
                  <Text>Invite friends</Text>
                </View>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  color="black"
                />
              </View>
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
                onPress={handleLogout}
              >
                <MaterialCommunityIcons
                  name="logout"
                  size={24}
                  color="#F85555"
                />
                <Text style={{ color: "#F85555", fontWeight: "bold" }}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
