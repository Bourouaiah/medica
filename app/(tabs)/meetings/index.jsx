import {
  View,
  Text,
  ScrollView,
  Image,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useFetchUser from "../../../custom-hooks/useFetchUser";
import { useUserContext } from "../../../UserContext";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";

const index = () => {
  const { userDoc } = useFetchUser();

  const appointments = userDoc?.appointments;

  const [selectedType, setSelectedType] = useState("upcoming");

  const filteredAppointments = appointments?.filter(
    (appointment) => appointment.type == selectedType
  );

  const handleSelect = (type) => {
    setSelectedType(type);
  };

  const types = [
    { label: "Upcoming", value: "upcoming" },
    { label: "Completed", value: "completed" },
    { label: "Cancelled", value: "cancelled" },
  ];

  const { loading } = useUserContext();

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
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={"always"}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Image
            style={{ width: 30, height: 30 }}
            source={require("../../../assets/images/logo.png")}
          />
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            My appointment
          </Text>
        </View>
        <View style={{ marginVertical: 20 }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: "row", gap: 10 }}>
              {types.map((type) => (
                <TouchableOpacity
                  key={type.value}
                  onPress={() => handleSelect(type.value)}
                >
                  <Text
                    style={{
                      color:
                        selectedType === type.value ? "#ffffff" : "#246BFD",
                      backgroundColor:
                        selectedType === type.value ? "#246BFD" : "#ffffff",
                      borderColor: "#246BFD",
                      borderStyle: "solid",
                      borderWidth: 2,
                      paddingHorizontal: 20,
                      paddingVertical: 5,
                      borderRadius: 15,
                      fontWeight: "bold",
                    }}
                  >
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
        <View>
          {loading ? (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                Loading appointments ...
              </Text>
              <Image
                style={{ width: 100, height: 100 }}
                source={require("../../../assets/images/loading-doctor.gif")}
              />
            </View>
          ) : filteredAppointments.length === 0 ? (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image
                style={{ width: 200, height: 200 }}
                source={require("../../../assets/images/no-appointment.png")}
              />
              <Text style={{ textAlign: "center", marginTop: 20 }}>
                No appointment schedule here at the moment.
              </Text>
            </View>
          ) : (
            filteredAppointments.map((appointment, index) => (
              <TouchableOpacity
                style={{
                  backgroundColor: "#FAFAFA",
                  paddingHorizontal: 5,
                  paddingVertical: 20,
                  borderRadius: 15,
                }}
                key={index}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 20,
                  }}
                >
                  <Image
                    style={{ width: 50, height: 50, borderRadius: 200 }}
                    source={{ uri: appointment.doctorProfilePicture }}
                  />
                  <View style={{ gap: 10 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                      {appointment.doctorName}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      <Text>
                        {appointment.selectedPackage
                          ? appointment.selectedPackage
                              .charAt(0)
                              .toUpperCase() +
                            appointment.selectedPackage.slice(1).toLowerCase()
                          : ""}
                      </Text>
                      <Text>-</Text>
                      <Text
                        style={{
                          color: "#246BFD",
                          borderColor: "#246BFD",
                          borderWidth: 1,
                          borderStyle: "solid",
                          borderRadius: 5,
                          paddingHorizontal: 5,
                          paddingVertical: 2,
                        }}
                      >
                        Upcoming
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      <Text>{appointment.formattedDate}</Text>
                      <Text>|</Text>
                      <Text>{appointment.formattedTime}</Text>
                    </View>
                  </View>
                  <TouchableOpacity>
                    <View
                      style={{
                        backgroundColor: "#EDF3FF",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 10,
                        borderRadius: 15,
                      }}
                    >
                      <AntDesign name="message1" size={24} color="#246BFD" />
                    </View>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    gap: 5,
                    paddingTop: 20,
                    borderTopColor: "#EFEFF0",
                    borderTopWidth: 1,
                    borderTopStyle: "solid",
                  }}
                >
                  <TouchableOpacity style={{ width: "50%" }}>
                    <Text
                      style={{
                        color: "#246BFD",
                        borderColor: "#246BFD",
                        backgroundColor: "white",
                        borderWidth: 2,
                        borderStyle: "solid",
                        padding: 5,
                        textAlign: "center",
                        borderRadius: 15,
                      }}
                    >
                      Cancel appointment
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ width: "50%" }}>
                    <Text
                      style={{
                        color: "white",
                        borderColor: "#246BFD",
                        backgroundColor: "#246BFD",
                        borderWidth: 2,
                        borderStyle: "solid",
                        padding: 5,
                        textAlign: "center",
                        borderRadius: 15,
                      }}
                    >
                      Reschedule
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
