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
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const index = () => {
  const { userDoc } = useFetchUser();

  const appointments = userDoc?.appointments;

  const [selectedType, setSelectedType] = useState("upcoming");

  const filteredAppointments = appointments.filter(
    (appointment) => appointment.type == selectedType
  );

  const handleSelect = (type) => {
    setSelectedType(type);
  };

  const types = [
    { label: "Upcoming", value: "upcoming" },
    { label: "Completed", value: "completed" },
    { label: "Canceled", value: "canceled" },
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
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                No appointments for this type.
              </Text>
            </View>
          ) : (
            filteredAppointments.map((appointment, index) => (
              <TouchableOpacity
                key={index}
              >
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
                      appointment.profilePicture
                        ? { uri: appointment.doctorProfilePicture }
                        : require("../../../assets/images/empty-profile-picture.png")
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
                        {appointment.doctorName}
                      </Text>
                      <TouchableOpacity>
                        <Ionicons
                          name="heart-outline"
                          size={24}
                          color="#246BFD"
                        />
                      </TouchableOpacity>
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
                        {appointment.doctorSpeciality.charAt(0).toUpperCase() +
                          appointment.doctorSpeciality.slice(1)}
                      </Text>
                      <Text>|</Text>
                      {/* <Text>{appointment.workStation}</Text> */}
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      <FontAwesome
                        name="star-half-empty"
                        size={18}
                        color="#246BFD"
                      />
                      {/* <Text>{doctor.rating ? `${doctor.rating}` : "--"}</Text>
                      <Text>
                        ({doctor.reviews ? `${doctor.rating}` : "--"} reviews)
                      </Text> */}
                    </View>
                  </View>
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
