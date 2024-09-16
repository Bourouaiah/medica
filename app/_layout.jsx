import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "../redux/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" options={{ headerShown: false }} />
        <Stack.Screen name="Login" options={{ headerShown: false }} />
        <Stack.Screen name="Home" options={{ headerShown: false }} />
        <Stack.Screen name="forgotPassword" options={{ headerShown: false }} />
        <Stack.Screen name="otpCodeEnter" options={{ headerShown: false }} />
        <Stack.Screen name="secureAccount" options={{ headerShown: false }} />
        <Stack.Screen
          name="resetPasswordSuccessful"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="accountSetUp" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}
