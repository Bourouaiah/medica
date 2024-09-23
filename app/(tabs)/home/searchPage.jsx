import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons";
import useFetchDoctors from "../../../custom-hooks/useFetchDoctors";
import { useUserContext } from "../../../UserContext";
import { useNavigation, useRoute } from "@react-navigation/native";

const SearchPage = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { doctors } = useFetchDoctors();
  const { loading } = useUserContext();

  const { selectedSpecialty: routeSpecialty } = route.params || {};

  const specialties = [
    { label: "All (الكل)", value: "all" },
    { label: "General Practitioner (طبيب عام)", value: "general_practitioner" },
    { label: "Cardiology (أمراض القلب)", value: "cardiology" },
    { label: "Neurology (طب الأعصاب)", value: "neurology" },
    { label: "Dermatology (الأمراض الجلدية)", value: "dermatology" },
    { label: "Pediatrics (طب الأطفال)", value: "pediatrics" },
    { label: "Orthopedics (جراحة العظام)", value: "orthopedics" },
    { label: "Oncology (طب الأورام)", value: "oncology" },
    { label: "Ophthalmology (طب العيون)", value: "ophthalmology" },
    { label: "Psychiatry (الطب النفسي)", value: "psychiatry" },
    { label: "Gastroenterology (طب الجهاز الهضمي)", value: "gastroenterology" },
    {
      label: "Obstetrics & Gynecology (طب النساء والتوليد)",
      value: "obstetrics_gynecology",
    },
  ];

  const [selectedSpecialty, setSelectedSpecialty] = useState(
    routeSpecialty ? routeSpecialty : "all"
  );
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelect = (specialty) => {
    setSelectedSpecialty(specialty);
  };

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSpecialty =
      selectedSpecialty === "all" || doctor.speciality === selectedSpecialty;
    const matchesSearchQuery =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.workStation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.speciality.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSpecialty && matchesSearchQuery;
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={"always"}
      >
        <StatusBar barStyle="dark-content" />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 10,
              backgroundColor: "#F5F5F5",
              borderRadius: 15,
              flex: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                flex: 1,
              }}
            >
              <Ionicons name="search" size={24} color="#BFBDBE" />
              <TextInput
                style={{ flex: 1 }}
                placeholder="Search"
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
              />
            </View>
            <TouchableOpacity>
              <Ionicons name="options-outline" size={24} color="#246BFD" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: "row", gap: 10 }}>
              {specialties.map((specialty) => (
                <TouchableOpacity
                  key={specialty.value}
                  onPress={() => handleSelect(specialty.value)}
                >
                  <Text
                    style={{
                      color:
                        selectedSpecialty === specialty.value
                          ? "#ffffff"
                          : "#246BFD",
                      backgroundColor:
                        selectedSpecialty === specialty.value
                          ? "#246BFD"
                          : "#ffffff",
                      borderColor: "#246BFD",
                      borderStyle: "solid",
                      borderWidth: 2,
                      paddingHorizontal: 20,
                      paddingVertical: 5,
                      borderRadius: 15,
                      fontWeight: "bold",
                    }}
                  >
                    {specialty.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
        <View style={{ marginTop: 20 }}>
          {loading ? (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                Loading doctors ...
              </Text>
              <Image
                style={{ width: 100, height: 100 }}
                source={require("../../../assets/images/loading-doctor.gif")}
              />
            </View>
          ) : filteredDoctors.length === 0 ? (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                No doctors available for this search.
              </Text>
            </View>
          ) : (
            filteredDoctors.map((doctor, index) => (
              <View
                key={index}
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
                  style={{ width: 70, height: 70 }}
                  source={
                    doctor.profilePicture
                      ? { uri: doctor.profilePicture }
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
                      {doctor.name}
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
                      {doctor.speciality.charAt(0).toUpperCase() +
                        doctor.speciality.slice(1)}
                    </Text>
                    <Text>|</Text>
                    <Text>{doctor.workStation}</Text>
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
                    <Text>{doctor.rating ? `${doctor.rating}` : "--"}</Text>
                    <Text>
                      ({doctor.reviews ? `${doctor.rating}` : "--"} reviews)
                    </Text>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchPage;
