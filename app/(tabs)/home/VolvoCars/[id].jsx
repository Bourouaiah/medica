import {
    FontAwesome,
    Ionicons,
    MaterialCommunityIcons,
  } from "@expo/vector-icons";
  import { useNavigation } from "@react-navigation/native";
  import { useLocalSearchParams } from "expo-router";
  import { useState } from "react";
  import { Image, TouchableOpacity } from "react-native";
  import { StatusBar } from "react-native";
  import { ScrollView, Text, View } from "react-native";
  import { SafeAreaView } from "react-native-safe-area-context";
  
  export default function VolvoCarDetailPage() {
    const {
      id,
      modal,
      name,
      description,
      condition,
      numberOfReviews,
      price,
      rating,
    } = useLocalSearchParams();
  
    const navigation = useNavigation();
  
    const [selectedImage, setSelectedImage] = useState(
      "https://m.atcdn.co.uk/vms/media/w980/83958660309e48749513b339a12468e9.jpg"
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back-outline" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="heart-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              overflow: "hidden",
              marginVertical: 20,
            }}
          >
            <Image
              style={{
                width: 250,
                height: 150,
                borderRadius: 20,
              }}
              src={selectedImage}
            />
          </View>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 28 }}>{name}</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginVertical: 8,
              }}
            >
              <Text
                style={{
                  backgroundColor: "#ECECEC",
                  color: "#2F2E33",
                  paddingHorizontal: 5,
                  paddingVertical: 3,
                  borderRadius: 5,
                }}
              >
                {condition}
              </Text>
              <FontAwesome name="star-half-empty" size={24} color="#323232" />
              <Text style={{ color: "#323232" }}>
                {rating} ({numberOfReviews} reviews)
              </Text>
            </View>
          </View>
          <View style={{ marginVertical: 20 }}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Description</Text>
            <Text style={{ color: "#4B4B4B", marginTop: 5 }}>{description}</Text>
          </View>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              Gallery photos
            </Text>
            <View style={{ flexDirection: "row" }}>
              <ScrollView horizontal={true} contentContainerStyle={{ gap: 10 }}>
                <TouchableOpacity
                  onPress={() =>
                    setSelectedImage(
                      "https://m.atcdn.co.uk/vms/media/w980/83958660309e48749513b339a12468e9.jpg"
                    )
                  }
                >
                  <Image
                    style={{ width: 100, height: 100, objectFit: "contain" }}
                    src="https://m.atcdn.co.uk/vms/media/w980/83958660309e48749513b339a12468e9.jpg"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    setSelectedImage(
                      "https://m.atcdn.co.uk/vms/media/w980/88218fe9612140189625d33514261fe4.jpg"
                    )
                  }
                >
                  <Image
                    style={{ width: 100, height: 100, objectFit: "contain" }}
                    src="https://m.atcdn.co.uk/vms/media/w980/88218fe9612140189625d33514261fe4.jpg"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    setSelectedImage(
                      "https://m.atcdn.co.uk/vms/media/w980/adc608622355428b947d02ea01ca0571.jpg"
                    )
                  }
                >
                  <Image
                    style={{ width: 100, height: 100, objectFit: "contain" }}
                    src="https://m.atcdn.co.uk/vms/media/w980/adc608622355428b947d02ea01ca0571.jpg"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    setSelectedImage(
                      "https://m.atcdn.co.uk/vms/media/w980/f3f2c7773814423e80e20a0963f06f67.jpg"
                    )
                  }
                >
                  <Image
                    style={{ width: 100, height: 100, objectFit: "contain" }}
                    src="https://m.atcdn.co.uk/vms/media/w980/f3f2c7773814423e80e20a0963f06f67.jpg"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    setSelectedImage(
                      "https://m.atcdn.co.uk/vms/media/w980/f5d2c7d73fd0497dabefecefaf559a3c.jpg"
                    )
                  }
                >
                  <Image
                    style={{ width: 100, height: 100, objectFit: "contain" }}
                    src="https://m.atcdn.co.uk/vms/media/w980/f5d2c7d73fd0497dabefecefaf559a3c.jpg"
                  />
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
              <Image
                style={{ width: 45, height: 45 }}
                source={require("../../../../assets/images/volvo.png")}
              />
              <View>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  Volvo store
                  </Text>
                  <Image
                    style={{ width: 10, height: 10 }}
                    source={require("../../../../assets/images/verified.png")}
                  />
                </View>
                <Text style={{ color: "#6A6A6A" }}>Official account of Volvo</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
              <TouchableOpacity>
                <MaterialCommunityIcons
                  name="message-text-outline"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="call-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={{ color: "#959595" }}>Price</Text>
              <Text style={{ fontSize: 24, fontWeight: "bold" }}>{price}</Text>
            </View>
            <TouchableOpacity>
              <Text
                style={{
                  backgroundColor: "#101010",
                  color: "#ffffff",
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 20,
                  fontWeight: "bold",
                }}
              >
                Make an offer
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
  