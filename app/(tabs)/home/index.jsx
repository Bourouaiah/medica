import { View, Text, Image, StatusBar, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useFetchUser from "../../../custom-hooks/useFetchUser";
import DoctorHomePage from "../../../components/doctor/DoctorHomePage";
import PatientHomePage from "../../../components/patient/PatientHomePage";

const index = () => {
  const { userDoc } = useFetchUser();

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
      {userDoc?.role == "doctor" ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={"always"}
        >
          <DoctorHomePage />
        </ScrollView>
      ) : userDoc?.role == "patient" ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={"always"}
        >
          <PatientHomePage />
        </ScrollView>
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Loading ...</Text>
          <Image
            style={{ width: 100, height: 100 }}
            source={require("../../../assets/images/loading-doctor.gif")}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default index;
