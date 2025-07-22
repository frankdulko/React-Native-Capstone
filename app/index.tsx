import Header from "@/components/Header";
import LLText from "@/components/LLText";
import { useAppContext } from "@/hooks/useAppContext";
import React, { useEffect } from "react";
import { SafeAreaView, ScrollView } from "react-native";

export default function Index() {
  const { loadUserData } = useAppContext();

  useEffect(() => {
    async function fetchData() {
      await loadUserData();
    }
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Header />
        <LLText size="xl" color="black">
          Welcome to Little Lemon
        </LLText>
        <LLText size="md" color="secondary">
          Your journey starts here
        </LLText>
      </ScrollView>
    </SafeAreaView>
  );
}
