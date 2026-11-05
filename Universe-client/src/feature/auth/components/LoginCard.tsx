import React, { useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import Input from "@/components/ui/Input/Input";
import { AtSign, KeyRound, Eye, EyeOff } from "lucide-react-native";

export default function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../../assets/images/LogosUnis/Main_logo.png")}
          style={styles.logo}
          resizeMode="contain"
          accessibilityLabel="UniVerse App Logo"
        />
        <Text style={styles.appLogoText}>UniVerse</Text>
      </View>

      {/* Content */}
      <View>
        <Image
          source={require("../../../../assets/images/AdvancedLogos/advanced_logo_silesian.png")}
          style={styles.logoUni}
          resizeMode="contain"
          accessibilityLabel="UniVerse App Logo"
        />
        {/* Title */}
        <View>
          <Text style={styles.mainTitle}>LOG IN TO USOS</Text>
          <Text style={styles.subTitle}>Access your student account.</Text>
        </View>
        {/* Inputs */}
        <View>
          {/* Mail Input */}
          <View>
            <TouchableOpacity style={styles.forgotLink}>
              <Text style={styles.linkText}>Need an ID?</Text>
            </TouchableOpacity>
            <Input
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              iconLeft={<AtSign size={20} color="#828282" strokeWidth={3} />}
            />
          </View>

          {/* Password Input */}
          <View style={styles.passwordContainer}>
            <TouchableOpacity style={styles.forgotLink}>
              <Text style={styles.linkText}>Forgot Password?</Text>
            </TouchableOpacity>
            <Input
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
              autoCapitalize="none"
              autoCorrect={false}
              iconLeft={<KeyRound size={20} color="#8E8E93" strokeWidth={3} />}
              iconRight={
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  activeOpacity={0.7}
                >
                  {isPasswordVisible ? (
                    <Eye size={20} color="#8E8E93" strokeWidth={3} />
                  ) : (
                    <EyeOff size={20} color="#8E8E93" strokeWidth={3} />
                  )}
                </TouchableOpacity>
              }
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 37,
    backgroundColor: "#FFFFFF",
    paddingTop: 65,
    borderBottomRightRadius: 45,
    borderBottomLeftRadius: 45,
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 50,
  },
  logo: {
    width: 44,
    height: 44,
    marginBottom: 8,
  },
  appLogoText: {
    fontSize: 24,
    fontFamily: "Onest_600SemiBold",
    fontWeight: "600",
    color: "#3F3F3F",
    marginBottom: 12,
  },
  logoUni: {
    width: 300,
    height: 67,
    marginBottom: 39,
  },
  mainTitle: {
    fontSize: 33,
    fontFamily: "Georama_900Black",
    fontWeight: "800",
    color: "#3F3F3F",
    textAlign: "center",
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 20,
    fontFamily: "Onest_400Regular",
    color: "#828282",
    textAlign: "center",
  },
  forgotLink: {
    alignSelf: "flex-end",
    marginBottom: 3,
  },
  linkText: {
    fontFamily: "Georama_600SemiBold",
    fontSize: 14,
    color: "#828282",
    textDecorationLine: "underline",
  },
  passwordContainer: {
    marginBottom: 20,
  },
});
