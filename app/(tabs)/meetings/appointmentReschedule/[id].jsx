import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";

import DateTimePicker from "@react-native-community/datetimepicker";
import Toast from "react-native-toast-message";
import {
  CommonActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { db } from "../../../../firebase";
import useFetchUser from "../../../../custom-hooks/useFetchUser";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const appointmentReschedulePage = () => {
  const navigation = useNavigation();
  const { userDoc } = useFetchUser();
  const route = useRoute();
  const { appointmentId, doctorId } = route.params;

  const [dateOfAppointment, setdateOfAppointment] = useState(new Date());
  const [show, setShow] = useState(false);
  const [timeOfAppointment, setTimeOfAppointment] = useState(new Date());
  const [showTime, setShowTime] = useState(false);

  const [loading, setLoading] = useState(false);

  const formattedDate = dateOfAppointment.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedTime = timeOfAppointment.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const onChange = (event, selectedDate) => {
    if (selectedDate) {
      setdateOfAppointment(selectedDate);
    }
    setShow(false);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const showTimepicker = () => {
    setShowTime(true);
  };

  const onTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      setTimeOfAppointment(selectedTime);
    }
    setShowTime(false);
  };

  const handleSubmit = async () => {
    if (!dateOfAppointment || !timeOfAppointment) {
      Toast.show({
        position: "bottom",
        type: "error",
        text1: "Error!",
        text2: "Please fill in the required data!",
      });
    } else {
      setLoading(true);

      const formattedDate = dateOfAppointment.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      const formattedTime = timeOfAppointment.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      try {
        const doctorDocRef = doc(db, "doctors", doctorId);
        const patientDocRef = doc(db, "patients", userDoc.patientId);

        const doctorDoc = await getDoc(doctorDocRef);
        const patientDoc = await getDoc(patientDocRef);

        const doctorAppointments = doctorDoc.data().appointments || [];
        const patientAppointments = patientDoc.data().appointments || [];

        const updatedDoctorAppointments = doctorAppointments.map(
          (appointment) => {
            if (appointment.appointmentId === appointmentId) {
              return {
                ...appointment,
                formattedDate,
                formattedTime,
              };
            }
            return appointment;
          }
        );

        const updatedPatientAppointments = patientAppointments.map(
          (appointment) => {
            if (appointment.appointmentId === appointmentId) {
              return {
                ...appointment,
                formattedDate,
                formattedTime,
              };
            }
            return appointment;
          }
        );

        await updateDoc(doctorDocRef, {
          appointments: updatedDoctorAppointments,
        });

        await updateDoc(patientDocRef, {
          appointments: updatedPatientAppointments,
        });

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: "index",
              },
            ],
          })
        );

        Toast.show({
          position: "bottom",
          type: "success",
          text1: "Success!",
          text2: "Appointment rescheduled successfully!",
        });
      } catch (error) {
        console.log(error);
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
        position: "relative",
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={"always"}
      >
        <StatusBar barStyle="dark-content" />
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <TouchableOpacity>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            Reschedule Appointment
          </Text>
        </View>
        <View style={{ marginVertical: 20 }}>
          <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}>
            Select date
          </Text>
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
              value={dateOfAppointment.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              editable={false}
            />
            {show && (
              <DateTimePicker
                value={dateOfAppointment}
                mode="date"
                display="default"
                onChange={onChange}
              />
            )}
          </View>
        </View>
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}>
            Select time
          </Text>
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
            <TouchableOpacity onPress={showTimepicker}>
              <FontAwesome5 name="clock" size={24} color="#246BFD" />
            </TouchableOpacity>
            <TextInput
              style={{ color: "#212121", flex: 1 }}
              placeholderTextColor={"#9E9E9F"}
              value={timeOfAppointment.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
              editable={false}
            />
            {showTime && (
              <DateTimePicker
                value={timeOfAppointment}
                mode="time"
                display="default"
                onChange={onTimeChange}
              />
            )}
          </View>
        </View>
        <View style={{ marginTop: 30 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#246BFD",
              padding: 10,
              borderRadius: 15,
            }}
            onPress={handleSubmit}
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
                Next
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};

export default appointmentReschedulePage;
