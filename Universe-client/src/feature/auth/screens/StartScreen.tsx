import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export function StartScreen() {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/login");
  };

  return (
    <View style={style.root}>
      <Text>Select Your University</Text>

      <TouchableOpacity onPress={handleContinue}>
        <Text>Continue</Text>
      </TouchableOpacity>
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
