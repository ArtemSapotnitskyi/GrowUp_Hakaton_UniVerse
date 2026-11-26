import { Tabs } from "expo-router";
import BottomNav from "../../components/ui/BottomNav/BottomNav";

export default function MainLayout() {
  return (
    <Tabs tabBar={() => <BottomNav />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="home" />
      <Tabs.Screen name="schedule" />
      <Tabs.Screen name="map" />
      <Tabs.Screen name="event" />
      <Tabs.Screen name="shop" />
    </Tabs>
  );
}
