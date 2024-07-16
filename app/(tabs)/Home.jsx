import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

import { Ionicons, AntDesign } from "@expo/vector-icons";

const Home = () => {
  return (
    <SafeAreaView
      style={{
        display: "flex",
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 10,
      }}
    >
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Image
            source={require("../../assets/images/green-logo.png")}
            style={{ width: 35, height: 29 }}
          />
          <View style={{ flexDirection: "row", gap: 30, alignItems: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Plantify</Text>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#EFEFEF",
                  borderStyle: "solid",
                  padding: 5,
                  borderRadius: 100,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons
                  name="notifications-sharp"
                  size={24}
                  color="#212121"
                />
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#EFEFEF",
                  borderStyle: "solid",
                  padding: 5,
                  borderRadius: 100,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="bookmark" size={24} color="#212121" />
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#FAFAFA",
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            gap: 10,
            borderRadius: 10,
            marginVertical: 20,
          }}
        >
          <AntDesign name="search1" size={20} color="#9E9E9F" />
          <TextInput
            style={{ color: "#212121", flex: 1 }}
            placeholder="Search plants"
            placeholderTextColor={"#9E9E9F"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
