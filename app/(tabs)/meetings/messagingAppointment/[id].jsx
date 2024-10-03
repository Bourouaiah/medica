import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "react-native";
import useFetchUser from "../../../../custom-hooks/useFetchUser";

const messagingAppointmentPage = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { userDoc } = useFetchUser();

  const {
    appointmentId,
    doctorWorkStation,
    doctorId,
    patientId,
    doctorEmail,
    doctorName,
    doctorPhoneNumber,
    doctorProfilePicture,
    doctorSpeciality,
    duratuion,
    formattedDate,
    formattedTime,
    problem,
    selectedPackage,
    timeInMilliseconds,
  } = route.params;

  const [loading, setLoading] = useState(false);
  const [isBeforeAppointment, setIsBeforeAppointment] = useState(true);
  const [isAfterAppointment, setIsAfterAppointment] = useState(false);

  useEffect(() => {
    const now = new Date().getTime();
    const appointmentStartTime = timeInMilliseconds;
    const appointmentEndTime = appointmentStartTime + duratuion * 60 * 1000;

    if (now >= appointmentStartTime && now <= appointmentEndTime) {
      setIsBeforeAppointment(false);
      setIsAfterAppointment(false);
    } else if (now > appointmentEndTime) {
      setIsBeforeAppointment(false);
      setIsAfterAppointment(true);
    }
  }, [timeInMilliseconds, duratuion]);

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
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            My appointment
          </Text>
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
            marginVertical: 20,
          }}
        >
          <Image
            style={{ width: 70, height: 70, borderRadius: 200 }}
            source={
              doctorProfilePicture
                ? { uri: doctorProfilePicture }
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
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                {doctorName}
              </Text>
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
                {doctorSpeciality.charAt(0).toUpperCase() +
                  doctorSpeciality.slice(1)}
              </Text>
              <Text>|</Text>
              <Text>{doctorWorkStation}</Text>
            </View>
          </View>
        </View>
        <View style={{ gap: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            Scheduled appointment
          </Text>
          <Text style={{ color: "#404040" }}>{formattedDate}</Text>
          <Text style={{ color: "#404040" }}>
            {formattedTime} ({duratuion} minutes)
          </Text>
        </View>
        <View style={{ gap: 10, marginTop: 20, marginBottom: 40 }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            Patient information
          </Text>
          <Text style={{ color: "#404040" }}>Full name: {userDoc.name}</Text>
          <Text style={{ color: "#404040" }}>Gender: {userDoc.gender}</Text>
          <Text style={{ color: "#404040" }}>Age: {userDoc.age}</Text>
          <Text style={{ color: "#404040" }}>Problem: {problem}</Text>
        </View>
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>Your package</Text>
          <View
            style={{
              backgroundColor: "#FAFAFA",
              borderRadius: 15,
              marginTop: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 20,
                paddingHorizontal: 15,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 15,
                }}
              >
                <AntDesign name="message1" size={24} color="#246BFD" />
                <View>
                  <Text
                    style={{
                      fontWeight: "bold",
                      marginBottom: 5,
                    }}
                  >
                    Messaging
                  </Text>
                  <Text style={{ fontSize: 12, color: "#676767" }}>
                    Chat messages with doctor
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 15,
                }}
              >
                <View>
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "#246BFD",
                      marginBottom: 5,
                    }}
                  >
                    1000 DA
                  </Text>
                  <Text style={{ fontSize: 12, color: "#676767" }}>
                    /30 mins
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 30 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#246BFD",
              padding: 10,
              borderRadius: 15,
            }}
            onPress={() => {
              if (isAfterAppointment) {
                navigation.navigate("writeReview/[id]", {
                  doctorId,
                  doctorName,
                  doctorProfilePicture,
                });
              } else {
                navigation.navigate("appointmentMessages/[id]", {
                  appointmentId,
                  doctorId,
                  doctorName,
                  patientId
                });
              }
            }}
            disabled={isBeforeAppointment}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {isAfterAppointment ? (
                  <Text>Appointment Ended, leave a review</Text>
                ) : (
                  <Text>
                    Message (Start on {formattedDate} at {formattedTime})
                  </Text>
                )}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default messagingAppointmentPage;
