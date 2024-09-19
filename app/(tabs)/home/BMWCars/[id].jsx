import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { Image, TouchableOpacity } from "react-native";
import { StatusBar } from "react-native";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BMWCarDetailPage() {
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
          <TouchableOpacity>
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
            src="https://m.atcdn.co.uk/vms/media/w980/83958660309e48749513b339a12468e9.jpg"
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
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Description</Text>
          <Text style={{ color: "#4B4B4B" }}>{description}</Text>
        </View>
        <View>
          <Text>Gallery photos</Text>
          <View style={{ flexDirection: "row" }}>
            <ScrollView>
              <TouchableOpacity>
                <Image
                  style={{ width: 100, height: 100, objectFit: "contain" }}
                  src="https://m.atcdn.co.uk/vms/media/w980/83958660309e48749513b339a12468e9.jpg"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  style={{ width: 100, height: 100, objectFit: "contain" }}
                  src="https://m.atcdn.co.uk/vms/media/w980/88218fe9612140189625d33514261fe4.jpg"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  style={{ width: 100, height: 100, objectFit: "contain" }}
                  src="https://m.atcdn.co.uk/vms/media/w980/adc608622355428b947d02ea01ca0571.jpg"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  style={{ width: 100, height: 100, objectFit: "contain" }}
                  src="https://m.atcdn.co.uk/vms/media/w980/f3f2c7773814423e80e20a0963f06f67.jpg"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  style={{ width: 100, height: 100, objectFit: "contain" }}
                  src="https://m.atcdn.co.uk/vms/media/w980/f5d2c7d73fd0497dabefecefaf559a3c.jpg"
                />
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
        <View>
          <View>
            <Image />
            <View>
              <View>
                <Text>BMW store</Text>
                <Image />
              </View>
              <Text>Official account of BMW</Text>
            </View>
          </View>
          <View>
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
        <View>
          <View>
            <Text>Price</Text>
            <Text>{price}</Text>
          </View>
          <TouchableOpacity>
            <Text>Make an offer</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
