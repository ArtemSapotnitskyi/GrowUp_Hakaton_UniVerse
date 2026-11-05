import React, { ReactNode } from "react";
import { View, TextInput, StyleSheet, TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

export default function Input({
  style,
  iconLeft,
  iconRight,
  ...props
}: InputProps) {
  return (
    <View style={[styles.container, style]}>
      {iconLeft && <View style={styles.iconLeftContainer}>{iconLeft}</View>}

      <TextInput
        style={styles.input}
        placeholderTextColor="#828282"
        {...props}
      />

      {iconRight && <View style={styles.iconRightContainer}>{iconRight}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    backgroundColor: "#F4F2EE",
    borderWidth: 1,
    borderColor: "#828282",
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  iconLeftContainer: {
    marginRight: 10,
  },
  iconRightContainer: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Onest_600SemiBold",
    color: "#828282",
    backgroundColor: "#F4F2EE",
  },
});
