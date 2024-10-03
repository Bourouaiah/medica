import { Stack } from "expo-router";

export default function HomeStack() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="appointmentReschedule/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="messagingAppointment/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="voiceCallAppointment/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="videoCallAppointment/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="appointmentMessages/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="writeReview/[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
