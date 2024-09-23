import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import {
  AntDesign,
  FontAwesome,
  FontAwesome6,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";

const doctorDetailPage = () => {
  const route = useRoute();
  const {
    doctorId,
    name,
    about,
    phoneNumber,
    dateOfBirth,
    age,
    gender,
    city,
    profilePicture,
    email,
    baridiMobRip,
    yearsOfExperience,
    speciality,
    workingDays,
    workingHours,
    workStation,
    certificate1,
    certificate2,
    certificate3,
    certificate4,
  } = route.params;
  return (
    <SafeAreaView
      style={{
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign name="hearto" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: "#FAFAFA",
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
            paddingVertical: 20,
            paddingHorizontal: 10,
            borderRadius: 15,
            marginBottom: 10,
          }}
        >
          <Image
            style={{ width: 70, height: 70 }}
            source={
              profilePicture
                ? { uri: profilePicture }
                : require("../../../../assets/images/empty-profile-picture.png")
            }
          />
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderBottomColor: "#747373",
                borderBottomWidth: 1,
                paddingBottom: 8,
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>{name}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                paddingTop: 8,
                paddingBottom: 5,
              }}
            >
              <Text>
                {speciality.charAt(0).toUpperCase() + speciality.slice(1)}
              </Text>
              <Text>|</Text>
              <Text>{workStation}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 20,
          }}
        >
          <View style={{ flex: 1, alignItems: "center", gap: 5 }}>
            <View
              style={{
                backgroundColor: "#EDF3FF",
                alignItems: "center",
                justifyContent: "center",
                padding: 10,
                borderRadius: 15,
              }}
            >
              <FontAwesome6 name="users" size={24} color="#246BFD" />
            </View>
            <Text
              style={{ color: "#246BFD", fontWeight: "bold", fontSize: 16 }}
            >
              5000
            </Text>
            <Text style={{ color: "#424242", textAlign: "center" }}>
              patients
            </Text>
          </View>

          <View style={{ flex: 1, alignItems: "center", gap: 5 }}>
            <View
              style={{
                backgroundColor: "#EDF3FF",
                alignItems: "center",
                justifyContent: "center",
                padding: 10,
                borderRadius: 15,
              }}
            >
              <MaterialIcons name="timeline" size={24} color="#246BFD" />
            </View>
            <Text
              style={{ color: "#246BFD", fontWeight: "bold", fontSize: 16 }}
            >
              {yearsOfExperience}
            </Text>
            <Text style={{ color: "#424242", textAlign: "center" }}>
              Years of experience
            </Text>
          </View>

          <View style={{ flex: 1, alignItems: "center", gap: 5 }}>
            <View
              style={{
                backgroundColor: "#EDF3FF",
                alignItems: "center",
                justifyContent: "center",
                padding: 10,
                borderRadius: 15,
              }}
            >
              <FontAwesome6 name="star-half-alt" size={24} color="#246BFD" />
            </View>
            <Text
              style={{ color: "#246BFD", fontWeight: "bold", fontSize: 16 }}
            >
              4.8
            </Text>
            <Text style={{ color: "#424242", textAlign: "center" }}>
              rating
            </Text>
          </View>

          <View style={{ flex: 1, alignItems: "center", gap: 5 }}>
            <View
              style={{
                backgroundColor: "#EDF3FF",
                alignItems: "center",
                justifyContent: "center",
                padding: 10,
                borderRadius: 15,
              }}
            >
              <MaterialIcons name="reviews" size={24} color="#246BFD" />
            </View>
            <Text
              style={{ color: "#246BFD", fontWeight: "bold", fontSize: 16 }}
            >
              4789
            </Text>
            <Text style={{ color: "#424242", textAlign: "center" }}>
              reviews
            </Text>
          </View>
        </View>
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>About me</Text>
          <Text style={{color: "#424242"}}>{about}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default doctorDetailPage;
