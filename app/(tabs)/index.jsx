import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Ionicons from "@expo/vector-icons/Ionicons";

const index = () => {
  return (
    <SafeAreaView
      style={{
        display: "flex",
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
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Image
              style={{ width: 40, height: 40, borderRadius: 200 }}
              source={require("../../assets/images/empty-profile-picture.webp")}
            />
            <View>
              <Text style={{ color: "#767676" }}>Good Morning 👋</Text>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                Abdelaziz Bourouaiah
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
            <TouchableOpacity>
              <Ionicons name="notifications-outline" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="heart-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#F5F5F5",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
            marginVertical: 20,
            borderRadius: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              gap: 5,
              alignItems: "center",
            }}
          >
            <Ionicons name="search" size={24} color="#BCBCBC" />
            <TextInput
              style={{ color: "#212121", flex: 1 }}
              keyboardType="email-address"
              placeholder="Search"
              autoCapitalize="none"
              placeholderTextColor="#BCBCBC"
            />
          </View>
          <TouchableOpacity>
            <Ionicons name="options-outline" size={24} color="#111111" />
          </TouchableOpacity>
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              Special offers
            </Text>
            <TouchableOpacity>
              <Text style={{ fontWeight: "bold" }}>See all</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: "#E7E7E7",
              justifyContent: "space-between",
              gap: 10,
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 20,
              borderRadius: 20,
              marginVertical: 20,
            }}
          >
            <View>
              <Image
                style={{ width: 180, height: 100, borderRadius: 20 }}
                src="https://m.atcdn.co.uk/vms/media/w980/83958660309e48749513b339a12468e9.jpg"
              />
            </View>
            <View style={{ alignItems: "center", gap: 3 }}>
              <Text style={{ fontWeight: "bold", fontSize: 40 }}>20%</Text>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                Week deals!
              </Text>
              <Text style={{ color: "#212121" }}>
                get a new car discount, only valid this week
              </Text>
            </View>
          </View>
        </View>
        <View style={{ marginVertical: 20 }}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: 3,
            }}
          >
            {[
              {
                source: require("../../assets/images/mercedes.png"),
                label: "Mercedes",
              },
              {
                source: require("../../assets/images/tesla.png"),
                label: "Tesla",
              },
              { source: require("../../assets/images/bmw.png"), label: "BMW" },
              {
                source: require("../../assets/images/toyota.png"),
                label: "Toyota",
              },
              {
                source: require("../../assets/images/bugatti.png"),
                label: "Bugatti",
              },
              {
                source: require("../../assets/images/honda.png"),
                label: "Honda",
              },
              {
                source: require("../../assets/images/chevrolet.png"),
                label: "Chevrolet",
              },
              {
                source: require("../../assets/images/volvo.png"),
                label: "Volvo",
              },
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{ width: "24%", alignItems: "center", marginBottom: 10 }}
              >
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: item.label === "Toyota" ? 200 : 0,
                  }}
                  source={item.source}
                />
                <Text style={{ marginTop: 5 }}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Top deals</Text>
            <TouchableOpacity>
              <Text style={{ fontWeight: "bold" }}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            style={{ marginVertical: 20 }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <View style={{ flexDirection: "row", gap: 10 }}>
              <TouchableOpacity
                style={{
                  borderColor: "#101010",
                  borderWidth: 2,
                  borderStyle: "solid",
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                  borderRadius: 15,
                }}
              >
                <Text style={{fontWeight: "bold"}}>All</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderColor: "#101010",
                  borderWidth: 2,
                  borderStyle: "solid",
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                  borderRadius: 15,
                }}
              >
                <Text style={{fontWeight: "bold"}}>Mercedes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderColor: "#101010",
                  borderWidth: 2,
                  borderStyle: "solid",
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                  borderRadius: 15,
                }}
              >
                <Text style={{fontWeight: "bold"}}>Tesla</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderColor: "#101010",
                  borderWidth: 2,
                  borderStyle: "solid",
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                  borderRadius: 15,
                }}
              >
                <Text style={{fontWeight: "bold"}}>BMW</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderColor: "#101010",
                  borderWidth: 2,
                  borderStyle: "solid",
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                  borderRadius: 15,
                }}
              >
                <Text style={{fontWeight: "bold"}}>Toyota</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderColor: "#101010",
                  borderWidth: 2,
                  borderStyle: "solid",
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                  borderRadius: 15,
                }}
              >
                <Text style={{fontWeight: "bold"}}>Volvo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderColor: "#101010",
                  borderWidth: 2,
                  borderStyle: "solid",
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                  borderRadius: 15,
                }}
              >
                <Text style={{fontWeight: "bold"}}>Bugatti</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderColor: "#101010",
                  borderWidth: 2,
                  borderStyle: "solid",
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                  borderRadius: 15,
                }}
              >
                <Text style={{fontWeight: "bold"}}>Honda</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderColor: "#101010",
                  borderWidth: 2,
                  borderStyle: "solid",
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                  borderRadius: 15,
                }}
              >
                <Text style={{fontWeight: "bold"}}>Chevrolet</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
