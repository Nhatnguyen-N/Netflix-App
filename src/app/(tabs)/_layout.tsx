import {
  Foundation,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Foundation name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="newAndHot"
        options={{
          title: "New & Hot",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="play-box-multiple-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="myNetflix"
        options={{
          title: "My Netflix",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="portrait" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
