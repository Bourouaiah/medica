import { Stack } from "expo-router";


export default function RootLayout() {
  return (
    <Stack initialRouteName="(tabs)">
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" options={{ headerShown: false }} />
      <Stack.Screen name="Login" options={{ headerShown: false }} />
      <Stack.Screen name="forgotPassword" options={{ headerShown: false }} />
      <Stack.Screen name="otpCodeEnter" options={{ headerShown: false }} />
      <Stack.Screen name="secureAccount" options={{ headerShown: false }} />
      <Stack.Screen name="resetPasswordSuccessful" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
