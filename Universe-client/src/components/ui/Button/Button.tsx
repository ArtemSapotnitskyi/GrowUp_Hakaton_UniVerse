import React, { ReactNode } from "react";

import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";

interface ButtonProp extends TouchableOpacityProps {
  children: ReactNode;
}

export default function Button({
  children,
  style,
  disabled = false,
  ...props
}: ButtonProp) {
  return (
    <TouchableOpacity
      style={[
        styles.buttonBase,
        disabled ? styles.buttonDisabled : styles.buttonActive,
        style,
      ]}
      activeOpacity={0.8}
      disabled={disabled}
      {...props}
    >
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonBase: {
    borderRadius: 13,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
  },
  buttonActive: {
    backgroundColor: "#003C7D",
    borderColor: "#fff",
    shadowColor: "#003C7D",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: "#A1A1AA",
    borderColor: "#FFFFFF",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Onest_600SemiBold",
  },
});
