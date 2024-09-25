import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AntDesign,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import DateTimePicker from "@react-native-community/datetimepicker";

import RNPickerSelect from "react-native-picker-select";
import Toast from "react-native-toast-message";
import {
  CommonActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import useFetchUser from "../../../../custom-hooks/useFetchUser";

const appointmentDetailInfo = () => {
  const { userDoc } = useFetchUser();
  const navigation = useNavigation();
  const route = useRoute();
  const {
    doctorId,
    name,
    phoneNumber,
    profilePicture,
    email,
    workStation,
    speciality,
  } = route.params;

  const [loading, setLoading] = useState(false);

  const [dateOfAppointment, setdateOfAppointment] = useState(new Date());
  const [show, setShow] = useState(false);
  const [timeOfAppointment, setTimeOfAppointment] = useState(new Date());
  const [showTime, setShowTime] = useState(false);
  const [duratuion, setDuration] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("messaging");
  const [problem, setProblem] = useState("");

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
    if (
      duratuion == "" ||
      selectedPackage == "" ||
      !dateOfAppointment ||
      !timeOfAppointment
    ) {
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
      await updateDoc(doc(db, "doctors", doctorId), {
        appointments: arrayUnion({
          formattedDate,
          formattedTime,
          duratuion,
          selectedPackage,
          problem,
          patientName: userDoc.name,
          patientPhoneNumber: userDoc.phoneNumber,
          patientEmail: userDoc.email,
          patientProfilePicture: userDoc.profilePicture,
          type: "upcoming",
        }),
      })
        .then(() => {
          updateDoc(doc(db, "patients", userDoc.patientId), {
            appointments: arrayUnion({
              formattedDate,
              formattedTime,
              duratuion,
              selectedPackage,
              problem,
              doctorName: name,
              doctorProfilePicture: profilePicture,
              doctorPhoneNumber: phoneNumber,
              doctorEmail: email,
              doctorSpeciality: speciality,
              type: "upcoming",
            }),
          });
        })
        .then(() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: "appointmentsSummary/[id]",
                  params: {
                    doctorId,
                    name,
                    profilePicture,
                    workStation,
                    speciality,
                    formattedDate,
                    formattedTime,
                    duratuion,
                    selectedPackage,
                  },
                },
              ],
            })
          );
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
            Book Appointment
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
        <View style={{ marginVertical: 20 }}>
          <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}>
            Select Duration
          </Text>
          <View
            style={{
              backgroundColor: "#FAFAFA",
              borderRadius: 10,
            }}
          >
            <RNPickerSelect
              placeholder={{
                label: "⏳  Select Duration",
                value: null,
              }}
              onValueChange={(value) => setDuration(value)}
              value={duratuion}
              items={[
                { label: "15 minutes", value: 15 },
                { label: "30 minutes", value: 30 },
                { label: "45 minutes", value: 45 },
                { label: "60 minutes", value: 60 },
              ]}
            />
          </View>
        </View>
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}>
            Select Package
          </Text>
          <TouchableOpacity
            style={{ backgroundColor: "#FAFAFA", borderRadius: 15 }}
            onPress={() => setSelectedPackage("messaging")}
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
                <View>
                  <MaterialCommunityIcons
                    name={
                      selectedPackage === "messaging"
                        ? "radiobox-marked"
                        : "radiobox-blank"
                    }
                    size={24}
                    color="#246BFD"
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#FAFAFA",
              borderRadius: 15,
              marginVertical: 10,
            }}
            onPress={() => setSelectedPackage("voicecall")}
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
                <Ionicons name="call-outline" size={24} color="#246BFD" />
                <View>
                  <Text
                    style={{
                      fontWeight: "bold",
                      marginBottom: 5,
                    }}
                  >
                    Voice call
                  </Text>
                  <Text style={{ fontSize: 12, color: "#676767" }}>
                    Voice call with doctor
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
                    2000 DA
                  </Text>
                  <Text style={{ fontSize: 12, color: "#676767" }}>
                    /30 mins
                  </Text>
                </View>
                <View>
                  <MaterialCommunityIcons
                    name={
                      selectedPackage === "voicecall"
                        ? "radiobox-marked"
                        : "radiobox-blank"
                    }
                    size={24}
                    color="#246BFD"
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: "#FAFAFA", borderRadius: 15 }}
            onPress={() => setSelectedPackage("videocall")}
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
                <Ionicons name="videocam-outline" size={24} color="#246BFD" />
                <View>
                  <Text
                    style={{
                      fontWeight: "bold",
                      marginBottom: 5,
                    }}
                  >
                    Video Call
                  </Text>
                  <Text style={{ fontSize: 12, color: "#676767" }}>
                    Video Call with doctor
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
                    3000 DA
                  </Text>
                  <Text style={{ fontSize: 12, color: "#676767" }}>
                    /30 mins
                  </Text>
                </View>
                <View>
                  <MaterialCommunityIcons
                    name={
                      selectedPackage === "videocall"
                        ? "radiobox-marked"
                        : "radiobox-blank"
                    }
                    size={24}
                    color="#246BFD"
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: 20 }}>
          <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}>
            Write your problem
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
            <AntDesign name="questioncircle" size={24} color="#246BFD" />
            <TextInput
              style={{ color: "#212121", flex: 1 }}
              keyboardType="default"
              value={problem}
              onChangeText={(value) => setProblem(value)}
              placeholder="Your problem"
              placeholderTextColor="#9E9E9F"
            />
          </View>
        </View>
        <View style={{ marginTop: 30 }}>
          <TouchableOpacity
            style={{ backgroundColor: "#246BFD" }}
            onPress={handleSubmit}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
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
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};

export default appointmentDetailInfo;
