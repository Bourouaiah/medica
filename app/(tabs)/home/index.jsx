import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ScrollView,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import useFetchCars from "../../../custom-hooks/useFetchCars";
import { FontAwesome } from "@expo/vector-icons";
import { useUserContext } from "../../../UserContext";
import useFetchUser from "../../../custom-hooks/useFetchUser";
import useFetchOffers from "../../../custom-hooks/useFetchOffers";

const index = () => {
  const navigation = useNavigation();

  const [selected, setSelected] = useState("All");

  const { cars } = useFetchCars();
  const { offers } = useFetchOffers();
  const { userDoc } = useFetchUser();
  const { loading } = useUserContext();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };

  const lastOffer = offers[offers.length - 1];

  const filteredCars = cars
    .filter(
      (car) =>
        selected === "All" || car.modal.toLowerCase() === selected.toLowerCase()
    )
    .filter((car) => car.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: "https://m.atcdn.co.uk/vms/media/w980/83958660309e48749513b339a12468e9.jpg",
          }}
        />
      </View>
      <View style={styles.details}>
        <Text style={styles.title}>{item.name}</Text>
        <View style={styles.ratingContainer}>
          <FontAwesome name="star-half-empty" size={24} color="black" />
          <Text>{item.rating}</Text>
          <Text>|</Text>
          <Text style={styles.status}>{item.condition}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.price}>{item.price}</Text>
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

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
              source={{ uri: userDoc?.profilePicture }}
            />
            <View>
              <Text style={{ color: "#767676" }}>Good Morning 👋</Text>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                {userDoc?.name}
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
              onChangeText={handleSearchChange}
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
                source={{ uri: lastOffer?.image }}
              />
            </View>
            <View style={{ alignItems: "center", gap: 3 }}>
              <Text style={{ fontWeight: "bold", fontSize: 40 }}>
                {lastOffer?.percantage}
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                {lastOffer?.title}
              </Text>
              <Text style={{ color: "#212121" }}>{lastOffer?.description}</Text>
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
                source: require("../../../assets/images/mercedes.png"),
                label: "Mercedes",
              },
              {
                source: require("../../../assets/images/tesla.png"),
                label: "Tesla",
              },
              {
                source: require("../../../assets/images/bmw.png"),
                label: "BMW",
              },
              {
                source: require("../../../assets/images/toyota.png"),
                label: "Toyota",
              },
              {
                source: require("../../../assets/images/bugatti.png"),
                label: "Bugatti",
              },
              {
                source: require("../../../assets/images/honda.png"),
                label: "Honda",
              },
              {
                source: require("../../../assets/images/chevrolet.png"),
                label: "Chevrolet",
              },
              {
                source: require("../../../assets/images/volvo.png"),
                label: "Volvo",
              },
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{ width: "24%", alignItems: "center", marginBottom: 10 }}
                onPress={() => navigation.navigate(`${item.label}Cars`)}
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
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Top ratings</Text>
          <ScrollView
            style={{ marginVertical: 20 }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <View style={{ flexDirection: "row", gap: 10 }}>
              {[
                "All",
                "Mercedes",
                "Tesla",
                "BMW",
                "Toyota",
                "Volvo",
                "Bugatti",
                "Honda",
                "Chevrolet",
              ].map((brand) => (
                <TouchableOpacity
                  key={brand}
                  onPress={() => setSelected(brand)}
                  style={{
                    borderColor: selected === brand ? "black" : "#101010",
                    borderWidth: 2,
                    borderStyle: "solid",
                    paddingHorizontal: 15,
                    paddingVertical: 5,
                    borderRadius: 15,
                    backgroundColor:
                      selected === brand ? "black" : "transparent",
                  }}
                >
                  <Text
                    style={{
                      color: selected === brand ? "white" : "black",
                      fontWeight: "bold",
                    }}
                  >
                    {brand}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
        {loading ? (
          <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.loadingContainer}>
              <Image
                style={{ width: 150, height: 150 }}
                source={require("../../../assets/images/loading-car.gif")}
              />
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                Loading cars...
              </Text>
            </View>
          </SafeAreaView>
        ) : (
          <FlatList
            data={filteredCars}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.grid}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  searchContainer: {
    backgroundColor: "#F5F5F5",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  searchInputContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  searchInput: {
    color: "#212121",
    flex: 1,
  },
  grid: {
    paddingBottom: 20,
  },
  item: {
    flex: 1,
    margin: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    maxWidth: "48%",
  },
  imageContainer: {
    backgroundColor: "#F3F3F3",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: "100%",
    height: 70,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  details: {
    marginTop: 8,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    maxWidth: "100%",
    overflow: "hidden",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginVertical: 8,
  },
  status: {
    backgroundColor: "#ECECEC",
    color: "#373B3E",
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  price: {
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default index;
