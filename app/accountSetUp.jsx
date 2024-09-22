import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Ionicons,
  FontAwesome5,
  MaterialIcons,
  Octicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useSelector } from "react-redux";

import { auth, db } from "../firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Toast from "react-native-toast-message";

import DateTimePicker from "@react-native-community/datetimepicker";

import RNPickerSelect from "react-native-picker-select";

const accountSetUp = () => {
  const currentUserData = useSelector((state) => state.user);
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState(new Date());
  const [show, setShow] = useState(false);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUserData?.email) {
      setEmail(currentUserData?.email);
    }
  }, [currentUserData]);

  const onChange = (event, selectedDate) => {
    if (selectedDate) {
      setdateOfBirth(selectedDate);
    }
    setShow(false);
  };

  const showDatepicker = () => {
    setShow(true);
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

  const handleSubmit = () => {
    if (name == "" || phoneNumber == "" || age == "" || city == "" || gender == "") {
      Toast.show({
        position: "top",
        type: "error",
        text1: "Error!",
        text2: "Please fill in the required data!",
      });
    } else {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, currentUserData?.password)
        .then((userCredential) => {
          return addDoc(collection(db, "patients"), {
            name,
            email,
            profilePicture,
            phoneNumber,
            age,
            dateOfBirth,
            city,
            gender,
            role: "patient"
          });
        })
        .then((userDocRef) => {
          const patientId = userDocRef.id;

          return updateDoc(doc(db, "patients", patientId), {
            patientId: patientId,
          });
        })
        .then(() => {
          navigation.navigate("Login");
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          Toast.show({
            position: "bottom",
            type: "error",
            text1: "Error!",
            text2: "Something went wrong, please try again!",
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
              source={require("../assets/images/empty-profile-picture.png")}
            />
          ) : (
            <Image
              style={{ width: 100, height: 100, borderRadius: 200 }}
              source={{ uri: profilePicture }}
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
            <FontAwesome5 name="user-alt" size={24} color="#246BFD" />
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
            <Ionicons name="call" size={24} color="#246BFD" />
            <TextInput
              style={{ color: "#212121", flex: 1 }}
              keyboardType="number-pad"
              placeholder="Phone Number"
              maxLength={10}
              value={phoneNumber}
              onChangeText={(value) => setPhoneNumber(value)}
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
            <MaterialIcons name="email" size={24} color="#246BFD" />
            <TextInput
              style={{ color: "#212121", flex: 1 }}
              keyboardType="email-address"
              placeholder="Email"
              editable={false}
              value={email}
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
            <TouchableOpacity onPress={showDatepicker}>
            <FontAwesome5 name="calendar-alt" size={24} color="#246BFD" />
            </TouchableOpacity>
            <TextInput
              style={{ color: "#212121", flex: 1 }}
              placeholderTextColor={"#9E9E9F"}
              value={dateOfBirth.toLocaleDateString()}
              editable={false}
            />
            {show && (
              <DateTimePicker
                value={dateOfBirth}
                mode="date"
                display="default"
                onChange={onChange}
              />
            )}
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
            <Octicons name="number" size={24} color="#246BFD" />
            <TextInput
              style={{ color: "#212121", flex: 1 }}
              keyboardType="number-pad"
              placeholder="Age"
              value={age}
              onChangeText={(value) => setAge(value)}
              maxLength={2}
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
            <MaterialIcons name="location-city" size={24} color="#246BFD" />
            <TextInput
              style={{ color: "#212121", flex: 1 }}
              keyboardType="default"
              placeholder="City"
              value={city}
              onChangeText={(value) => setCity(value)}
              placeholderTextColor="#9E9E9F"
            />
          </View>
          <View
            style={{
              backgroundColor: "#FAFAFA",
              borderRadius: 10,
            }}
          >
            <RNPickerSelect
              placeholder={{
                label: "👥  Select Gender",
                value: null,
              }}
              onValueChange={(value) => setGender(value)}
              value={gender}
              items={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
              ]}
            />
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#246BFD",
            padding: 15,
            borderRadius: 20,
            marginTop: 30,
          }}
          onPress={handleSubmit}
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
              Continue
            </Text>
          )}
        </TouchableOpacity>
        <Toast />
      </ScrollView>
    </SafeAreaView>
  );
};

export default accountSetUp;
