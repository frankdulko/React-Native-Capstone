import LLButton from "@/components/LLButton";
import LLText from "@/components/LLText";
import LLTextInput from "@/components/LLTextInput";
import React from "react";
import { Image, SafeAreaView, StyleSheet, View } from "react-native";

export default function OnboardingScreen() {
  const [firstName, setFirstName] = React.useState("");
  const [email, setEmail] = React.useState("");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Image source={require("../assets/images/Logo.png")} resizeMode="contain" style={{ height: 65, width: "100%" }} />
      </View>
      <View style={styles.main}>
        <LLText size="xl" color="black">
          Let us get to know you
        </LLText>
        <LLText size="lg" color="black">
          First Name
        </LLText>
        <LLTextInput value={firstName} onChangeText={setFirstName} />
        <LLText size="lg" color="black">
          Email
        </LLText>
        <LLTextInput value={email} onChangeText={setEmail} />
        <LLButton
          title="Next"
          onPress={() => {
            // Handle next action
            console.log("First Name:", firstName, "Email:", email);
          }}
          fullWidth
          style={{ marginTop: "auto" }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#aeaeae",
    paddingVertical: 10,
  },
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    marginTop: "auto",
  },
});
