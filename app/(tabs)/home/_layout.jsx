import { Stack } from "expo-router";

export default function HomeStack() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="searchPage" options={{ headerShown: false }} />
      <Stack.Screen name="doctors/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="appointments/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="appointmentsSummary/[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
