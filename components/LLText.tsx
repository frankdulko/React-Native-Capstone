import { Colors } from "@/constants/Colors";
import React from "react";
import { Text as RNText, TextProps as RNTextProps, StyleProp, TextStyle } from "react-native";

// Define available text sizes and color names
export type TextSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
export type TextColor = "primary" | "secondary" | "error" | "warning" | "info" | "success" | "black" | "white";
export type TextWeight = "thin" | "light" | "regular" | "medium" | "bold" | "black";

export interface LLTextProps extends RNTextProps {
  /** Font size key from TextSize */
  size?: TextSize;
  /** Color key from TextColor */
  color?: TextColor;
  /** Font weight key from TextWeight */
  weight?: TextWeight;
  style?: StyleProp<TextStyle>;
}

// Map size keys to numeric font sizes
const sizeMap: Record<TextSize, number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
};

// Map color keys to your design system colors
const colorMap: Record<TextColor, string> = {
  primary: Colors.primary.green,
  secondary: "#03DAC6",
  error: "#B00020",
  warning: "#FBBC05",
  info: Colors.gray.medium,
  success: "#4CAF50",
  black: "#000000",
  white: "#FFFFFF",
};

// Map weight keys to font weight values
const weightMap: Record<TextWeight, TextStyle["fontWeight"]> = {
  thin: "100",
  light: "300",
  regular: "400",
  medium: "500",
  bold: "700",
  black: "900",
};

/**
 * CustomText component wraps React Native's Text
 * and applies standardized size and color styles.
 */
const LLText: React.FC<LLTextProps> = ({ size = "md", color = "black", weight = "regular", style, children, ...rest }) => {
  const textStyle: StyleProp<TextStyle> = {
    fontSize: sizeMap[size],
    color: colorMap[color],
    fontWeight: weightMap[weight],
  };

  return (
    <RNText style={[textStyle, style]} {...rest}>
      {children}
    </RNText>
  );
};

export default LLText;
