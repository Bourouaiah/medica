import { View, Text, ScrollView, TouchableOpacity, Modal } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { Image } from "react-native";
import useFetchOffers from "../../../custom-hooks/useFetchOffers";

import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const Offers = () => {
  const navigation = useNavigation();
  const { offers } = useFetchOffers();

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
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back-outline"
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            Special offers
          </Text>
        </View>
        <View>
          {offers?.map((offer, index) => (
            <View
              key={index}
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
                  source={{ uri: offer.image }}
                />
              </View>
              <View style={{ alignItems: "center", gap: 3 }}>
                <Text style={{ fontWeight: "bold", fontSize: 40 }}>
                  {offer.percantage}
                </Text>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  {offer.title}
                </Text>
                <Text style={{ color: "#212121" }}>{offer.description}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Offers;
