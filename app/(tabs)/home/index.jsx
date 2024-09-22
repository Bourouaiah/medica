import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import useFetchUser from "../../../custom-hooks/useFetchUser";

const index = () => {
  const { userDoc } = useFetchUser();

  const categories = [
    {
      image: require("../../../assets/images/generalist.jpg"),
      label: "Generalist",
    },
    {
      image: require("../../../assets/images/cardiology.png"),
      label: "Cardiology",
    },
    {
      image: require("../../../assets/images/neurology.png"),
      label: "Neurology",
    },
    {
      image: require("../../../assets/images/dermatology.png"),
      label: "Dermatology",
    },
    {
      image: require("../../../assets/images/pediatrics.png"),
      label: "Pediatrics",
    },
    {
      image: require("../../../assets/images/orthopedics.png"),
      label: "Orthopedics",
    },
    {
      image: require("../../../assets/images/oncology.png"),
      label: "Oncology",
    },
    {
      image: require("../../../assets/images/ophthalmology.png"),
      label: "Ophthalmology",
    },
    {
      image: require("../../../assets/images/psychiatry.png"),
      label: "Psychiatry",
    },
    {
      image: require("../../../assets/images/gastroenterology.png"),
      label: "Gastroenterology",
    },
    {
      image: require("../../../assets/images/obstetrics.png"),
      label: "Obstetrics",
    },
  ];

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
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Image
              style={{ width: 50, height: 50 }}
              source={require("../../../assets/images/empty-profile-picture.png")}
            />
            <View>
              <Text style={{ color: "#747373" }}>Hello! 👋</Text>
              <Text
                style={{ color: "#212020", fontWeight: "bold", fontSize: 18 }}
              >
                Abdelaziz Bourouaiah
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
          <TouchableOpacity>
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
            <Text
              style={{ color: "#212020", fontWeight: "bold", fontSize: 16 }}
            >
              Doctor Speciality
            </Text>
            <TouchableOpacity>
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
            <Text
              style={{ color: "#212020", fontWeight: "bold", fontSize: 16 }}
            >
              Doctors
            </Text>
            <TouchableOpacity>
              <Text style={{ color: "#246BFD", fontWeight: "bold" }}>
                See All
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 10}}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View style={{flexDirection: "row", gap: 10}}>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: "#246BFD",
                      backgroundColor: "#ffffff",
                      borderColor: "#246BFD",
                      borderStyle: "solid",
                      borderWidth: 2,
                      paddingHorizontal: 20,
                      paddingVertical: 5,
                      borderRadius: 15,
                      fontWeight: "bold",
                    }}
                  >
                    All
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: "#246BFD",
                      backgroundColor: "#ffffff",
                      borderColor: "#246BFD",
                      borderStyle: "solid",
                      borderWidth: 2,
                      paddingHorizontal: 20,
                      paddingVertical: 5,
                      borderRadius: 15,
                      fontWeight: "bold",
                    }}
                  >
                    Generalist
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: "#246BFD",
                      backgroundColor: "#ffffff",
                      borderColor: "#246BFD",
                      borderStyle: "solid",
                      borderWidth: 2,
                      paddingHorizontal: 20,
                      paddingVertical: 5,
                      borderRadius: 15,
                      fontWeight: "bold",
                    }}
                  >
                    Cardiology
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: "#246BFD",
                      backgroundColor: "#ffffff",
                      borderColor: "#246BFD",
                      borderStyle: "solid",
                      borderWidth: 2,
                      paddingHorizontal: 20,
                      paddingVertical: 5,
                      borderRadius: 15,
                      fontWeight: "bold",
                    }}
                  >
                    Neurology
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: "#246BFD",
                      backgroundColor: "#ffffff",
                      borderColor: "#246BFD",
                      borderStyle: "solid",
                      borderWidth: 2,
                      paddingHorizontal: 20,
                      paddingVertical: 5,
                      borderRadius: 15,
                      fontWeight: "bold",
                    }}
                  >
                    Dermatology
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: "#246BFD",
                      backgroundColor: "#ffffff",
                      borderColor: "#246BFD",
                      borderStyle: "solid",
                      borderWidth: 2,
                      paddingHorizontal: 20,
                      paddingVertical: 5,
                      borderRadius: 15,
                      fontWeight: "bold",
                    }}
                  >
                    Pediatrics
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: "#246BFD",
                      backgroundColor: "#ffffff",
                      borderColor: "#246BFD",
                      borderStyle: "solid",
                      borderWidth: 2,
                      paddingHorizontal: 20,
                      paddingVertical: 5,
                      borderRadius: 15,
                      fontWeight: "bold",
                    }}
                  >
                    Orthopedics
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: "#246BFD",
                      backgroundColor: "#ffffff",
                      borderColor: "#246BFD",
                      borderStyle: "solid",
                      borderWidth: 2,
                      paddingHorizontal: 20,
                      paddingVertical: 5,
                      borderRadius: 15,
                      fontWeight: "bold",
                    }}
                  >
                    Oncology
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: "#246BFD",
                      backgroundColor: "#ffffff",
                      borderColor: "#246BFD",
                      borderStyle: "solid",
                      borderWidth: 2,
                      paddingHorizontal: 20,
                      paddingVertical: 5,
                      borderRadius: 15,
                      fontWeight: "bold",
                    }}
                  >
                    Ophthalmology
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: "#246BFD",
                      backgroundColor: "#ffffff",
                      borderColor: "#246BFD",
                      borderStyle: "solid",
                      borderWidth: 2,
                      paddingHorizontal: 20,
                      paddingVertical: 5,
                      borderRadius: 15,
                      fontWeight: "bold",
                    }}
                  >
                    Psychiatry
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: "#246BFD",
                      backgroundColor: "#ffffff",
                      borderColor: "#246BFD",
                      borderStyle: "solid",
                      borderWidth: 2,
                      paddingHorizontal: 20,
                      paddingVertical: 5,
                      borderRadius: 15,
                      fontWeight: "bold",
                    }}
                  >
                    Gastroenterology
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: "#246BFD",
                      backgroundColor: "#ffffff",
                      borderColor: "#246BFD",
                      borderStyle: "solid",
                      borderWidth: 2,
                      paddingHorizontal: 20,
                      paddingVertical: 5,
                      borderRadius: 15,
                      fontWeight: "bold",
                    }}
                  >
                    Obstetrics
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
