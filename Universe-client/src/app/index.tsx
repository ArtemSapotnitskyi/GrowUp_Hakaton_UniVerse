import { View, Text, ActivityIndicator } from "react-native";
import { Redirect } from "expo-router";

export default function AppEntry() {
  const isAuth = true;
  const isReady = true;

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isAuth) {
    return <Redirect href="/home" />;
  }

  return <Redirect href="/start" />;
}
