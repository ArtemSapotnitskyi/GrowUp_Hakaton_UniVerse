import { View, Text, StyleSheet } from "react-native";

export default function MapScreen() {
  return (
    <View style={style.root}>
      <Text>Hello From Map Screen</Text>
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
