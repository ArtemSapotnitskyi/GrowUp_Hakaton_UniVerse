import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  Image,
} from "react-native";
import { UNIVERSITIES } from "../data/seed";
import UniCard from "../components/UniCard";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import Button from "@/components/ui/Button/Button";

export function StartScreen() {
  const [selectedUniId, setSelectedUniId] = useState<string | null>(null);
  const [isBtnActive, setIsBtnActive] = useState(false);

  //Handler Select Uni
  const handleSelectUniversity = (id: string) => {
    setSelectedUniId(id);
    setIsBtnActive(true);
  };

  //Rout Login
  const router = useRouter();
  const handleContinue = () => {
    router.push("/login");
  };

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../../assets/images/LogosUnis/Main_logo.png")}
            style={styles.logo}
            resizeMode="contain"
            accessibilityLabel="UniVerse App Logo"
          />
          <Text style={styles.appLogoText}>UniVerse</Text>
        </View>
        <Text style={styles.mainTitle}>Select Your University</Text>
        <Text style={styles.subTitle}>
          Find and connect your academic institution to access services.
        </Text>
      </View>

      {/* Univer List */}
      <View style={styles.listContainer}>
        <View style={styles.designContainer}>
          <View style={styles.searchRow}>
            <View style={styles.searchInputContainer}>
              <Feather
                name="search"
                size={20}
                color="#00478F"
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search for university or city..."
                placeholderTextColor="#A1A1AA"
              />
            </View>
            <TouchableOpacity>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={UNIVERSITIES}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 14 }}
            style={{ flex: 1 }}
            renderItem={({ item, index }) => (
              <UniCard
                name={item.name}
                location={item.location}
                logo={item.logo}
                isActive={item.id === selectedUniId}
                onPress={() => handleSelectUniversity(item.id)}
              />
            )}
          />
        </View>
      </View>

      <Button disabled={!isBtnActive} onPress={handleContinue}>
        Continue
      </Button>

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
    marginTop: 65,
    marginHorizontal: 25,
    backgroundColor: "#F4F2EE",
    paddingBottom: 30,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
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
  mainTitle: {
    fontSize: 30,
    fontFamily: "Georama_800ExtraBold",
    fontWeight: "800",
    color: "#3F3F3F",
    textAlign: "center",
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 18,
    fontFamily: "Onest_700Bold",
    color: "#828282",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  listContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 45,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    overflow: "visible",
    padding: 13,
    marginBottom: 25,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 7,
    elevation: 5,
  },
  designContainer: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: "#F1F1F1",
    borderRadius: 30,
    overflow: "hidden",
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F4F5",
    borderWidth: 1,
    borderColor: "#00478F",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Onest_700Bold",
    color: "#3F3F46",
  },
  cancelText: {
    color: "#00478F",
    fontWeight: "600",
    fontSize: 16,
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
