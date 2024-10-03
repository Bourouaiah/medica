import { Image, StatusBar, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useFetchUser from "../../../custom-hooks/useFetchUser";
import PatientMeetingsPage from "../../../components/patient/PatientMeetingsPage";
import DoctorMeetingsPage from "../../../components/doctor/DoctorMeetingsPage";

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
      {userDoc?.role == "patient" ? (
        <PatientMeetingsPage />
      ) : userDoc?.role == "doctor" ? (
        <DoctorMeetingsPage />
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
