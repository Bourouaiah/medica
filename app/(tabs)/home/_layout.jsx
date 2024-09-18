import { Stack } from 'expo-router';

export default function HomeStack() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MercedesCars"
        options={{ tabBarStyle: { display: 'none' }, headerShown: false }}
      />
      <Stack.Screen
        name="BMWCars"
        options={{ tabBarStyle: { display: 'none' }, headerShown: false }}
      />
      <Stack.Screen
        name="ChevroletCars"
        options={{ tabBarStyle: { display: 'none' }, headerShown: false }}
      />
      <Stack.Screen
        name="HondaCars"
        options={{ tabBarStyle: { display: 'none' }, headerShown: false }}
      />
      <Stack.Screen
        name="BugattiCars"
        options={{ tabBarStyle: { display: 'none' }, headerShown: false }}
      />
      <Stack.Screen
        name="ToyotaCars"
        options={{ tabBarStyle: { display: 'none' }, headerShown: false }}
      />
      <Stack.Screen
        name="VolvoCars"
        options={{ tabBarStyle: { display: 'none' }, headerShown: false }}
      />
    </Stack>
  );
}
