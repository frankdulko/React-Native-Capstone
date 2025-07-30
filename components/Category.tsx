import { Colors } from "@/constants/Colors";
import React from "react";
import { Pressable } from "react-native";
import LLText from "./LLText";

export default function Category({ label, isSelected, onPress }: { label: string; isSelected: boolean; onPress: () => void }) {
  return (
    <Pressable style={{ padding: 8, backgroundColor: isSelected ? Colors.primary.green : Colors.gray.light, borderRadius: 20 }} onPress={onPress}>
      <LLText size="md" weight="bold" style={{ color: isSelected ? "#fff" : Colors.primary.green }}>
        {label}
      </LLText>
    </Pressable>
  );
}
