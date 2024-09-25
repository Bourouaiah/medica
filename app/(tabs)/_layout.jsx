import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import * as Animatable from 'react-native-animatable';

export default function TabLayout() {
  const activeColor = '#246BFD';
  const inactiveColor = '#9E9E9E';

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === 'home') {
            iconName = 'home';
          } else if (route.name === 'meetings') {
            iconName = 'calendar';
          }

          return (
            <Animatable.View
              animation={focused ? 'pulse' : undefined}
              duration={800}
              useNativeDriver
            >
              <FontAwesome name={iconName} size={28} color={color} />
            </Animatable.View>
          );
        },
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="meetings"
        options={{
          headerShown: false,
          title: 'Appointments',
        }}
      />
    </Tabs>
  );
}
