import { MenuItem } from "@/app";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import LLText from "./LLText";

interface MenuItemProps {
  item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemProps) {
  return (
    <View style={styles.card}>
      <View style={{ flex: 1, gap: 8 }}>
        <LLText size="lg" color="black" weight="bold">
          {item.name}
        </LLText>
        <LLText size="md" color="primary" numberOfLines={2}>
          {item.description}
        </LLText>
        <LLText size="lg" color="info" weight="bold">
          {item.price}
        </LLText>
      </View>
      <Image
        source={{ uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true` }}
        style={{ width: 115, height: 115, borderRadius: 8 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    gap: 16,
    height: 150,
  },
});
