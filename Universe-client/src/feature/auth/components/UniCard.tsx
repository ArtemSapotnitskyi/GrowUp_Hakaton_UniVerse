import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { UniversityListItemProps } from "../types";
import { Feather } from "@expo/vector-icons";

export default function UniCard({
  name,
  location,
  logo,
  onPress,
  isActive,
}: UniversityListItemProps) {
  return (
    <TouchableOpacity
      style={[styles.container, isActive && { backgroundColor: "#E3F2FD" }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} contentFit="contain" />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.location} numberOfLines={1}>
          {location}
        </Text>
      </View>
      <Feather
        name="chevron-right"
        size={20}
        color="#3C3C43"
        style={styles.iconOpacity}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 5,
  },
  logoContainer: {
    width: 56,
    height: 56,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1C1C1E",
    marginBottom: 2,
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  location: {
    fontSize: 12,
    color: "#8E8E93",
  },
  iconOpacity: {
    opacity: 0.6,
  },
});
