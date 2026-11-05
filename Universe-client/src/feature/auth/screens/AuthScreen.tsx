import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import LoginCard from "../components/LoginCard";
import Button from "@/components/ui/Button/Button";

export default function AuthScreen() {
  //Rout Login
  const router = useRouter();
  const handleLogin = () => {
    router.push("/home");
  };
  return (
    <View style={styles.root}>
      <View style={styles.contentContainer}>
        <LoginCard />
        <Button style={styles.signIn} onPress={handleLogin}>
          Sign in
        </Button>
      </View>
      <TouchableOpacity style={styles.footerLink}>
        <Text style={styles.footerLinkText}>
          Can't find your university? Suggest it.
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginHorizontal: 25,
    backgroundColor: "#F4F2EE",
    paddingBottom: 30,
  },
  contentContainer: {
    flex: 1,
  },
  signIn: {
    marginTop: 28,
  },
  footerLink: {
    alignItems: "center",
  },
  footerLinkText: {
    color: "#71717A",
    fontSize: 14,
    fontFamily: "Onest_600SemiBold",
    textDecorationLine: "underline",
    fontWeight: "500",
  },
});
