import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useSelector } from "react-redux";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const accountSetUp = () => {
  const currentUserData = useSelector((state) => state.user);
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (currentUserData?.email) {
      setEmail(currentUserData?.email);
    }
  }, [currentUserData]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
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
        display: "flex",
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}
    >
      <StatusBar barStyle="dark-content" />
      <View style={{ flexDirection: "row", gap: 15, alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ fontWeight: "bold", fontSize: 22 }}>
          Fill your profile
        </Text>
      </View>
      <View
        style={{
          position: "relative",
          marginHorizontal: "auto",
          marginVertical: 40,
        }}
      >
        {!profilePicture ? (
          <Image
            style={{ width: 100, height: 100, borderRadius: 200 }}
            source={require("../assets/images/empty-profile-picture.webp")}
          />
        ) : (
          <Image
            style={{ width: 100, height: 100, borderRadius: 200 }}
            source={{ uri: profilePicture }}
          />
        )}
        <TouchableOpacity
          style={{
            backgroundColor: "black",
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
      <View style={{ gap: 20 }}>
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
          <FontAwesome5 name="user-alt" size={24} color="black" />
          <TextInput
            style={{ color: "#212121", flex: 1 }}
            keyboardType="default"
            placeholder="Name"
            value={name}
            onChangeText={(value) => setName(value)}
            placeholderTextColor="#9E9E9F"
          />
        </View>
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
            editable={false}
            value={email}
            placeholderTextColor="#9E9E9F"
          />
        </View>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "#101010",
          padding: 10,
          borderRadius: 20,
          marginTop: 80,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "#ffffff",
            fontWeight: "bold",
          }}
        >
          Continue
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default accountSetUp;
