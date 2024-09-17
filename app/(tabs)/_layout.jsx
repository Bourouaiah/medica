import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          headerShown: false,
          title: 'Orders',
          tabBarIcon: ({ color }) => <MaterialIcons name="local-grocery-store" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          headerShown: false,
          title: 'Inbox',
          tabBarIcon: ({ color }) => <AntDesign name="message1" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          headerShown: false,
          title: 'Wallet',
          tabBarIcon: ({ color }) => <FontAwesome5 name="wallet" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: 'Profile',
          tabBarIcon: ({ color }) => <FontAwesome5 name="user-alt" size={24} color="black" />,
        }}
      />
    </Tabs>
  );
}
