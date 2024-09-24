import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { useRoute } from "@react-navigation/native";

const appointmentsSummaryPage = () => {
  const route = useRoute();
  const {
    doctorId,
    name,
    profilePicture,
    workStation,
    speciality,
    formattedDate,
    formattedTime,
    duratuion,
    selectedPackage,
  } = route.params;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingVertical: 10,
        position: "relative",
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={"always"}
      >
        <StatusBar barStyle="dark-content" />
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
            style={{ width: 70, height: 70, borderRadius: 200 }}
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
            backgroundColor: "#FAFAFA",
            borderRadius: 15,
            paddingVertical: 20,
            paddingHorizontal: 10,
            marginVertical: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: "#246BFD" }}>Date & Hour</Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Text style={{ color: "#424141" }}>{formattedDate}</Text>
              <Text style={{ color: "#424141" }}>|</Text>
              <Text style={{ color: "#424141" }}>{formattedTime}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 20,
            }}
          >
            <Text style={{ color: "#246BFD" }}>Package</Text>
            <Text style={{ color: "#424141" }}>{selectedPackage}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: "#246BFD" }}>Duration</Text>
            <Text style={{ color: "#424141" }}>{duratuion} minutes</Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#FAFAFA",
            borderRadius: 15,
            paddingVertical: 20,
            paddingHorizontal: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: "#246BFD" }}>Ammount</Text>
            <Text style={{ color: "#424141" }}>
              {selectedPackage == "messaging"
                ? "1000 DA"
                : selectedPackage == "voicecall"
                ? "2000 DA"
                : "3000 DA"}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 10,
            }}
          >
            <Text style={{ color: "#246BFD" }}>
              Duration ({duratuion} minutes)
            </Text>
            <Text style={{ color: "#424141" }}>
              {(Number(duratuion) / 30).toFixed(2)} *{" "}
              {selectedPackage == "messaging"
                ? "1000 DA"
                : selectedPackage == "voicecall"
                ? "2000 DA"
                : "3000 DA"}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderTopColor: "#424141",
              borderTopWidth: 1,
              borderTopStyle: "solid",
              paddingTop: 20,
            }}
          >
            <Text style={{ color: "#246BFD" }}>Total</Text>
            <Text style={{ color: "#424141" }}>
              {(
                (Number(duratuion) / 30) *
                (selectedPackage === "messaging"
                  ? 1000
                  : selectedPackage === "voicecall"
                  ? 2000
                  : 3000)
              ).toFixed(2)}{" "}
              DA
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 30 }}>
          <TouchableOpacity>
            <Text
              style={{
                backgroundColor: "#246BFD",
                color: "white",
                textAlign: "center",
                padding: 10,
                borderRadius: 15,
                fontWeight: "bold",
              }}
            >
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default appointmentsSummaryPage;
