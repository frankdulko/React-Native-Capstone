import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import LLText, { TextColor } from "./LLText";

interface LLButtonProps {
  title: string;
  onPress: () => void;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  buttonType?: "primary" | "secondary" | "alert" | "disabled";
  buttonSize?: "sm" | "md" | "lg";
}

const TextColorMap: Record<string, TextColor> = {
  primary: "white",
  secondary: "info",
  disabled: "white",
};

const LLButton: React.FC<LLButtonProps> = ({ title, onPress, fullWidth = false, buttonType = "primary", buttonSize = "lg", style, textStyle }) => {
  const disabled = buttonType === "disabled";
  const buttonStyles = [styles.button, styles[buttonType], styles[buttonSize], fullWidth && styles.fullWidth, style];

  return (
    <TouchableOpacity disabled={disabled} style={buttonStyles} onPress={onPress}>
      <LLText weight="bold" color={TextColorMap[buttonType]} size={buttonSize} style={textStyle}>
        {title}
      </LLText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    backgroundColor: Colors.primary.green,
    borderRadius: 8,
  },
  secondary: {
    borderColor: Colors.gray.medium,
    borderWidth: 2,
  },
  alert: {
    backgroundColor: Colors.primary.yellow,
    borderRadius: 8,
  },
  disabled: {
    backgroundColor: Colors.gray.medium,
    borderRadius: 8,
  },
  fullWidth: {
    alignSelf: "stretch",
  },
  sm: {
    height: 30,
    paddingHorizontal: 12,
  },
  md: { height: 40, paddingHorizontal: 16 },
  lg: {
    height: 50,
    paddingHorizontal: 20,
  },
});

export default LLButton;
