import { Stack } from "expo-router";

export default function HomeStack() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="MercedesCars"
        options={{ tabBarStyle: { display: "none" }, headerShown: false }}
      />
      <Stack.Screen
        name="MercedesCars/[id]"
        options={{ tabBarStyle: { display: "none" }, headerShown: false }}
      />
      <Stack.Screen
        name="BMWCars"
        options={{ tabBarStyle: { display: "none" }, headerShown: false }}
      />
      <Stack.Screen
        name="BMWCars/[id]"
        options={{ tabBarStyle: { display: "none" }, headerShown: false }}
      />
      <Stack.Screen
        name="ChevroletCars"
        options={{ tabBarStyle: { display: "none" }, headerShown: false }}
      />
      <Stack.Screen
        name="ChevroletCars/[id]"
        options={{ tabBarStyle: { display: "none" }, headerShown: false }}
      />
      <Stack.Screen
        name="HondaCars"
        options={{ tabBarStyle: { display: "none" }, headerShown: false }}
      />
      <Stack.Screen
        name="HondaCars/[id]"
        options={{ tabBarStyle: { display: "none" }, headerShown: false }}
      />
      <Stack.Screen
        name="BugattiCars"
        options={{ tabBarStyle: { display: "none" }, headerShown: false }}
      />
      <Stack.Screen
        name="BugattiCars/[id]"
        options={{ tabBarStyle: { display: "none" }, headerShown: false }}
      />
      <Stack.Screen
        name="ToyotaCars"
        options={{ tabBarStyle: { display: "none" }, headerShown: false }}
      />
      <Stack.Screen
        name="ToyotaCars/[id]"
        options={{ tabBarStyle: { display: "none" }, headerShown: false }}
      />
      <Stack.Screen
        name="TeslaCars"
        options={{ tabBarStyle: { display: "none" }, headerShown: false }}
      />
      <Stack.Screen
        name="TeslaCars/[id]"
        options={{ tabBarStyle: { display: "none" }, headerShown: false }}
      />
      <Stack.Screen
        name="VolvoCars"
        options={{ tabBarStyle: { display: "none" }, headerShown: false }}
      />
      <Stack.Screen
        name="VolvoCars/[id]"
        options={{ tabBarStyle: { display: "none" }, headerShown: false }}
      />
      <Stack.Screen
        name="offers"
        options={{ tabBarStyle: { display: "none" }, headerShown: false }}
      />
    </Stack>
  );
}
