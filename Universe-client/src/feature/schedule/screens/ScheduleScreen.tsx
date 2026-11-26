import { View, Text, StyleSheet } from "react-native";

export default function ScheduleScreen() {
  return (
    <View style={style.root}>
      <Text>Hello From Schedule Screen</Text>
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
