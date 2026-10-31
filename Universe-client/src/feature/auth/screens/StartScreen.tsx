import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
} from "react-native";
import { UNIVERSITIES } from "../data/seed";
import UniCard from "../components/UniCard";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";

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
    <View style={style.root}>
      {/* Header */}
      <View style={style.headerContainer}>
        <Text style={style.appLogoText}>UniVerse</Text>
        <Text style={style.mainTitle}>Select Your University</Text>
        <Text style={style.subTitle}>
          Find and connect your academic institution to access services.
        </Text>
      </View>

      {/* Univer List */}
      <View style={style.listContainer}>
        <View style={style.designContainer}>
          <View style={style.searchRow}>
            <View style={style.searchInputContainer}>
              <Feather
                name="search"
                size={20}
                color="#00478F"
                style={style.searchIcon}
              />
              <TextInput
                style={style.searchInput}
                placeholder="Search for university or city..."
                placeholderTextColor="#A1A1AA"
              />
            </View>
            <TouchableOpacity>
              <Text style={style.cancelText}>Cancel</Text>
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

      <TouchableOpacity
        style={[style.continueBtn, isBtnActive && style.continueBtnActive]}
        onPress={handleContinue}
        activeOpacity={0.8}
        disabled={!isBtnActive}
      >
        <Text style={style.continueBtnText}>Continue</Text>
      </TouchableOpacity>

      <TouchableOpacity style={style.footerLink}>
        <Text style={style.footerLinkText}>
          Can't find your university? Suggest it.
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: 80,
    marginHorizontal: 18,
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
    marginBottom: 24,
  },
  appLogoText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#3F3F46",
    marginBottom: 12,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#3F3F46",
    textAlign: "center",
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 16,
    color: "#71717A",
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
    fontSize: 15,
    color: "#3F3F46",
  },
  cancelText: {
    color: "#00478F",
    fontWeight: "600",
    fontSize: 16,
  },
  continueBtn: {
    backgroundColor: "#A1A1AA",
    borderRadius: 13,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  continueBtnActive: {
    backgroundColor: "#003C7D",
    borderWidth: 1,
    borderColor: "#fff",
    shadowColor: "#003C7D",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 4,
  },
  continueBtnText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  footerLink: {
    alignItems: "center",
  },
  footerLinkText: {
    color: "#71717A",
    fontSize: 14,
    textDecorationLine: "underline",
    fontWeight: "500",
  },
});
