import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign, Entypo, FontAwesome5 } from "@expo/vector-icons";
import useFetchUser from "../../../../custom-hooks/useFetchUser";
import { db } from "../../../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Toast from "react-native-toast-message";
import { ActivityIndicator } from "react-native";

const appointmentMessagesPage = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { userDoc } = useFetchUser();

  const { appointmentId, doctorId, doctorName, doctorProfilePicture } =
    route.params;

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (userDoc) {
      const appointment = userDoc.appointments.find(
        (appointment) => appointment.appointmentId === appointmentId
      );
      if (appointment) {
        setMessages(appointment.messages || []);
      }
    }
  }, [userDoc, appointmentId]);

  const handleSubmit = async () => {
    if (message == "") {
      Toast.show({
        position: "top",
        type: "error",
        text1: "Error!",
        text2: "Type a message!",
      });
    } else {
      setLoading(true);
      try {
        const patientDocRef = doc(db, "patients", userDoc.patientId);
        const doctorDocRef = doc(db, "doctors", doctorId);
        const patientDocSnap = await getDoc(patientDocRef);
        const doctorDocSnap = await getDoc(doctorDocRef);

        if (patientDocSnap.exists()) {
          const patientData = patientDocSnap.data();
          const existingAppointments = patientData.appointments || [];

          const appointmentIndex = existingAppointments.findIndex(
            (appointment) => appointment.appointmentId === appointmentId
          );

          if (appointmentIndex !== -1) {
            const updatedAppointment = {
              ...existingAppointments[appointmentIndex],
              messages: existingAppointments[appointmentIndex].messages || [],
            };

            updatedAppointment.messages.push({
              senderId: userDoc.patientId,
              senderName: userDoc.name,
              text: message,
              timestamp: new Date(),
            });

            const updatedAppointments = [...existingAppointments];
            updatedAppointments[appointmentIndex] = updatedAppointment;

            await updateDoc(patientDocRef, {
              appointments: updatedAppointments,
            });

            if (doctorDocSnap.exists()) {
              const doctorData = doctorDocSnap.data();
              const doctorAppointments = doctorData.appointments || [];
              const doctorAppointmentIndex = doctorAppointments.findIndex(
                (appointment) => appointment.appointmentId === appointmentId
              );

              if (doctorAppointmentIndex !== -1) {
                const updatedDoctorAppointment = {
                  ...doctorAppointments[doctorAppointmentIndex],
                  messages:
                    doctorAppointments[doctorAppointmentIndex].messages || [],
                };

                updatedDoctorAppointment.messages.push({
                  senderId: doctorId,
                  senderName: userDoc.name,
                  text: message,
                  timestamp: new Date(),
                });

                const updatedDoctorAppointments = [...doctorAppointments];
                updatedDoctorAppointments[doctorAppointmentIndex] =
                  updatedDoctorAppointment;

                await updateDoc(doctorDocRef, {
                  appointments: updatedDoctorAppointments,
                });
              }
            }

            setMessage("");

            Toast.show({
              position: "top",
              type: "success",
              text1: "Success!",
              text2: "Message added successfully to both patient and doctor!",
            });
          }
        } else {
          console.log("No such patient document!");
        }
      } catch (error) {
        console.error("Error adding message: ", error);
        setMessage("");
        Toast.show({
          position: "bottom",
          type: "error",
          text1: "Error!",
          text2: "Something went wrong, please try again!",
        });
      } finally {
        setLoading(false);
      }
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
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>{doctorName}</Text>
      </View>
      <View style={{ flex: 1, marginBottom: 60 }}>
        {messages.map((msg, index) => (
          <View key={index} style={{ marginVertical: 5 }}>
            <Text style={{ fontWeight: "bold" }}>{msg.senderName}:</Text>
            <Text>{msg.text}</Text>
          </View>
        ))}
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          position: "absolute",
          bottom: 10,
          left: 12,
        }}
      >
        <View
          style={{
            backgroundColor: "#FAFAFA",
            width: "90%",
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 7,
            paddingVertical: 15,
            borderRadius: 15,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
            }}
          >
            <TouchableOpacity>
              <FontAwesome5 name="smile" size={24} color="#A0A0A0" />
            </TouchableOpacity>
            <TextInput
              style={{ flex: 1 }}
              placeholder="Type a message ..."
              value={message}
              onChangeText={(value) => setMessage(value)}
              placeholderTextColor="#A0A0A0"
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <TouchableOpacity>
              <Entypo name="attachment" size={22} color="#A0A0A0" />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome5 name="camera" size={22} color="#A0A0A0" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ width: "10%" }}>
          <TouchableOpacity
            style={{
              backgroundColor: loading ? "#A0A0A0" : "#2E72FE",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 200,
              padding: 5,
            }}
            onPress={loading ? null : handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <FontAwesome5 name="microphone" size={22} color="white" />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <Toast />
    </SafeAreaView>
  );
};

export default appointmentMessagesPage;
