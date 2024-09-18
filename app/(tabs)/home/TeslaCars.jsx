import {
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useFetchCars from "../../../custom-hooks/useFetchCars";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useUserContext } from "../../../UserContext";

const TeslaCars = () => {
  const { cars } = useFetchCars();
  const { loading } = useUserContext();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };

  const filteredCars = cars.filter(
    (car) =>
      car.modal.toLowerCase() === "tesla" &&
      car.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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


  if (loading) {
    return (
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
    );
  }

  if (filteredCars.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.loadingContainer}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            No Tesla cars found
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={24} color="#BCBCBC" />
          <TextInput
            style={styles.searchInput}
            keyboardType="default"
            placeholder="Search"
            autoCapitalize="none"
            placeholderTextColor="#BCBCBC"
            value={searchQuery}
            onChangeText={handleSearchChange}
          />
        </View>
        <TouchableOpacity>
          <Ionicons name="options-outline" size={24} color="#111111" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredCars}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
      />
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

export default TeslaCars;
