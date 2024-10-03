import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign, Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import useFetchUser from "../../../../custom-hooks/useFetchUser";
import { db } from "../../../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Toast from "react-native-toast-message";
import { ActivityIndicator } from "react-native";

import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";

const appointmentMessagesPage = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { userDoc } = useFetchUser();

  const currentUserId = userDoc.patientId
    ? userDoc.patientId
    : userDoc.doctorId
    ? userDoc.doctorId
    : null;

  const { appointmentId, doctorId, patientId, doctorName } = route.params;

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

  const handleDocumentSelection = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (result.type === "success") {
        console.log("Document URI:", result.uri);
      }
    } catch (err) {
      console.error("Error picking document:", err);
    }
  };

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === "granted") {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });
      if (!result.canceled) {
        console.log("Camera image URI:", result.uri);
      }
    } else {
      console.log("Camera permission denied");
    }
  };

  const inputRef = useRef(null);

  const handleEmojiPress = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

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
        const patientDocRef = doc(db, "patients", patientId);
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
              senderId: currentUserId,
              senderName: userDoc.name,
              text: message,
              timestamp: new Date().toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              }),
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
                  senderId: currentUserId,
                  senderName: userDoc.name,
                  text: message,
                  timestamp: new Date().toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  }),
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
      <Text
        style={{
          marginTop: 10,
          backgroundColor: "#EEEEEE",
          color: "#717070",
          textAlign: "center",
          paddingVertical: 4,
          paddingHorizontal: 8,
          borderRadius: 10,
        }}
      >
        Session started
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={"always"}
        style={{ flex: 1, marginBottom: 40, marginTop: 10 }}
      >
        <View style={{ flex: 1, marginBottom: 40 }}>
          {messages.map((msg, index) => (
            <View key={index} style={{ marginVertical: 5 }}>
              {msg.senderId == userDoc.patientId ||
              msg.senderId == userDoc.doctorId ? (
                <View
                  style={{
                    backgroundColor: "#246BFD",
                    padding: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderRadius: 15,
                  }}
                >
                  <Text style={{ fontWeight: "bold", color: "white", flex: 1 }}>
                    {msg.text}
                  </Text>
                  <Text style={{ fontSize: 10, color: "white" }}>
                    {msg.timestamp}
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    backgroundColor: "#F5F5F5",
                    padding: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderRadius: 15,
                  }}
                >
                  <Text style={{ fontWeight: "bold", color: "black", flex: 1 }}>
                    {msg.text}
                  </Text>
                  <Text style={{ fontSize: 10, color: "black" }}>
                    {msg.timestamp}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
      <View
        style={{
          backgroundColor: "white",
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
            <TouchableOpacity onPress={handleEmojiPress}>
              <FontAwesome5 name="smile" size={24} color="#A0A0A0" />
            </TouchableOpacity>
            <TextInput
              ref={inputRef}
              style={{ flex: 1 }}
              placeholder="Type a message ..."
              value={message}
              onChangeText={(value) => setMessage(value)}
              placeholderTextColor="#A0A0A0"
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <TouchableOpacity onPress={handleDocumentSelection}>
              <Entypo name="attachment" size={22} color="#A0A0A0" />
            </TouchableOpacity>
            <TouchableOpacity onPress={openCamera}>
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
              <Ionicons name="send" size={18} color="white" />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <Toast />
    </SafeAreaView>
  );
};

export default appointmentMessagesPage;
