import { View, Text, StyleSheet } from "react-native";

export default function AuthScreen() {
  return (
    <View style={style.root}>
      <View>
        <Text>Hello from login screen</Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: 80,
    marginLeft: 25,
  },
});
