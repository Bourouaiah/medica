import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import useFetchUser from "../../custom-hooks/useFetchUser";
import useFetchDoctors from "../../custom-hooks/useFetchDoctors";
import { useUserContext } from "../../UserContext";
import { useNavigation } from "@react-navigation/native";

const PatientHomePage = () => {
  const navigation = useNavigation();
  const { userDoc } = useFetchUser();
  const { doctors } = useFetchDoctors();

  const { loading } = useUserContext();

  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  const handleSelect = (specialty) => {
    setSelectedSpecialty(specialty);
  };

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

  const filteredDoctors =
    selectedSpecialty === "all"
      ? doctors
      : doctors.filter((doctor) => doctor.speciality == selectedSpecialty);

  const categories = [
    {
      image: require("../../assets/images/generalist.jpg"),
      label: "Generalist",
      value: "general_practitioner",
    },
    {
      image: require("../../assets/images/cardiology.png"),
      label: "Cardiology",
      value: "cardiology",
    },
    {
      image: require("../../assets/images/neurology.png"),
      label: "Neurology",
      value: "neurology",
    },
    {
      image: require("../../assets/images/dermatology.png"),
      label: "Dermatology",
      value: "dermatology",
    },
    {
      image: require("../../assets/images/pediatrics.png"),
      label: "Pediatrics",
      value: "pediatrics",
    },
    {
      image: require("../../assets/images/orthopedics.png"),
      label: "Orthopedics",
      value: "orthopedics",
    },
    {
      image: require("../../assets/images/oncology.png"),
      label: "Oncology",
      value: "oncology",
    },
    {
      image: require("../../assets/images/ophthalmology.png"),
      label: "Ophthalmology",
      value: "ophthalmology",
    },
    {
      image: require("../../assets/images/psychiatry.png"),
      label: "Psychiatry",
      value: "psychiatry",
    },
    {
      image: require("../../assets/images/gastroenterology.png"),
      label: "Gastroenterology",
      value: "gastroenterology",
    },
    {
      image: require("../../assets/images/obstetrics.png"),
      label: "Obstetrics",
      value: "obstetrics_gynecology",
    },
  ];
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          {!userDoc?.profilePicture ? (
            <Image
              style={{ width: 50, height: 50, borderRadius: 200 }}
              source={require("../../assets/images/empty-profile-picture.png")}
            />
          ) : (
            <Image
              style={{ width: 50, height: 50, borderRadius: 200 }}
              source={{ uri: userDoc?.profilePicture }}
            />
          )}
          <View>
            <Text style={{ color: "#747373" }}>Hello! 👋</Text>
            <Text
              style={{ color: "#212020", fontWeight: "bold", fontSize: 18 }}
            >
              {userDoc?.name}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginVertical: 20 }}>
        <TouchableOpacity onPress={() => navigation.navigate("searchPage")}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 10,
              backgroundColor: "#F5F5F5",
              borderRadius: 15,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <Ionicons name="search" size={24} color="#BFBDBE" />
              <Text style={{ color: "#BFBDBE" }}>Search</Text>
            </View>
            <Ionicons name="options-outline" size={24} color="#246BFD" />
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "#212020", fontWeight: "bold", fontSize: 16 }}>
            Doctor Speciality
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("searchPage")}>
            <Text style={{ color: "#246BFD", fontWeight: "bold" }}>
              See All
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            marginVertical: 20,
          }}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={{
                width: "22%",
                alignItems: "center",
                marginBottom: 15,
              }}
              onPress={() =>
                navigation.navigate("searchPage", {
                  selectedSpecialty: category.value,
                })
              }
            >
              <Image
                style={{
                  width: 55,
                  height: 55,
                  marginBottom: 5,
                }}
                source={category.image}
              />
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 10,
                  fontWeight: "bold",
                }}
              >
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "#212020", fontWeight: "bold", fontSize: 16 }}>
            Doctors
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("searchPage")}>
            <Text style={{ color: "#246BFD", fontWeight: "bold" }}>
              See All
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 10 }}>
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
                source={require("../../assets/images/loading-doctor.gif")}
              />
            </View>
          ) : filteredDoctors.length === 0 ? (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                No doctors available for this specialty.
              </Text>
            </View>
          ) : (
            filteredDoctors.map((doctor, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate("doctors/[id]", {
                    doctorId: doctor.doctorId,
                    name: doctor.name,
                    about: doctor.about,
                    phoneNumber: doctor.phoneNumber,
                    dateOfBirth: doctor.dateOfBirth,
                    age: doctor.age,
                    gender: doctor.gender,
                    city: doctor.city,
                    profilePicture: doctor.profilePicture,
                    email: doctor.email,
                    baridiMobRip: doctor.baridiMobRip,
                    yearsOfExperience: doctor.yearsOfExperience,
                    speciality: doctor.speciality,
                    workingDays: doctor.workingDays,
                    workingHours: doctor.workingHours,
                    workStation: doctor.workStation,
                    certificate1: doctor.certificate1,
                    certificate2: doctor.certificate2,
                    certificate3: doctor.certificate3,
                    certificate4: doctor.certificate4,
                  })
                }
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
                      doctor.profilePicture
                        ? { uri: doctor.profilePicture }
                        : require("../../assets/images/empty-profile-picture.png")
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
              </TouchableOpacity>
            ))
          )}
        </View>
      </View>
    </>
  );
};

export default PatientHomePage;
