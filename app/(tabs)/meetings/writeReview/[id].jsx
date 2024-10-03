import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {
  CommonActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import useFetchUser from "../../../../custom-hooks/useFetchUser";

const writeReviewPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { doctorId, doctorName, doctorProfilePicture } = route.params;

  const { userDoc } = useFetchUser();

  const [reviewTime, setReviewTime] = useState(new Date());
  const [reviewDate, setReviewDate] = useState(new Date());
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (rating == "" || review == "") {
      Toast.show({
        position: "bottom",
        type: "error",
        text1: "Error!",
        text2: "Please fill in the required data!",
      });
    } else {
      setLoading(true);

      const formattedReviewDate = reviewDate.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      const formattedReviewTime = reviewTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      await updateDoc(doc(db, "doctors", doctorId), {
        reviews: arrayUnion({
          rating,
          review,
          reviewerName: userDoc?.name,
          reviewerProfilePicture: userDoc?.profilePicture,
          formattedReviewDate,
          formattedReviewTime,
        }),
      })
        .then(() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: "(tabs)",
                },
              ],
            })
          );
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          Toast.show({
            position: "bottom",
            type: "error",
            text1: "Error!",
            text2: "Something went wrong, please try again!",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingVertical: 10,
        position: "relative",
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={"always"}
      >
        <StatusBar barStyle="dark-content" />
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <TouchableOpacity>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            Write a review
          </Text>
        </View>
        <View style={{ alignItems: "center", gap: 10, marginVertical: 20 }}>
          {doctorProfilePicture ? (
            <Image
              style={{ width: 100, height: 100, borderRadius: 200 }}
              source={require("../../../../assets/images/empty-profile-picture.png")}
            />
          ) : (
            <Image
              style={{ width: 100, height: 100, borderRadius: 200 }}
              source={{ uri: doctorProfilePicture }}
            />
          )}
          <Text style={{ fontWeight: "bold" }}>
            How was your experience with Dr. {doctorName}
          </Text>
        </View>
        <View style={{ gap: 10 }}>
          <View style={{ gap: 5 }}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              Write a rating over 5.0
            </Text>
            <TextInput
              style={{
                backgroundColor: "#FAFAFA",
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 10,
              }}
              value={rating}
              keyboardType="number-pad"
              onChangeText={(value) => setRating(value)}
              placeholder="Your rating here"
              placeholderTextColor="#9E9E9E"
            />
          </View>
          <View style={{ gap: 5 }}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              Write your review
            </Text>
            <TextInput
              style={{
                backgroundColor: "#FAFAFA",
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 10,
              }}
              value={review}
              keyboardType="default"
              onChangeText={(value) => setReview(value)}
              placeholder="Your review here"
              placeholderTextColor="#9E9E9E"
            />
          </View>
        </View>
        <View style={{ marginVertical: 30 }}>
          <TouchableOpacity
            style={{
              backgroundColor: loading ? "#A9A9A9" : "#246BFD",
              padding: 10,
              borderRadius: 15,
              opacity: loading ? 0.7 : 1,
            }}
            onPress={loading ? null : handleSubmit}
            activeOpacity={0.8}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Submit
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};

export default writeReviewPage;
