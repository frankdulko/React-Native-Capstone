import LLButton from "@/components/LLButton";
import LLText from "@/components/LLText";
import LLTextInput, { hasError, Input, onChangeText, validateEmail } from "@/components/LLTextInput";
import { setOnboardingState } from "@/constants/helpers";
import { useAppContext } from "@/hooks/useAppContext";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, SafeAreaView, StyleSheet, View } from "react-native";

export default function OnboardingScreen() {
  const [firstName, setFirstName] = useState<Input>({ value: "", error: undefined });
  const [email, setEmail] = useState<Input>({ value: "", error: undefined });
  const { updateUserData } = useAppContext();

  const handleSubmit = () => {
    onChangeText(firstName.value, setFirstName, true);
    onChangeText(email.value, setEmail, true, validateEmail);

    if (hasError(firstName) || hasError(email)) {
      console.log("Validation errors:", firstName.error, email.error);
      return;
    }

    updateUserData({
      firstName: firstName.value,
      email: email.value,
    })
      .then(() => {
        console.log("User data updated successfully");
        router.replace("/"); // Redirect to home or another screen after onboarding
        setOnboardingState(true) // Mark onboarding as complete
          .then(() => console.log("Onboarding state set to true"))
          .catch((error) => console.error("Error setting onboarding state:", error));
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  };

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
        <LLTextInput value={firstName.value} error={firstName.error} onChangeText={(text) => onChangeText(text, setFirstName, true)} />
        <LLText size="lg" color="black">
          Email
        </LLText>
        <LLTextInput value={email.value} error={email.error} onChangeText={(text) => onChangeText(text, setEmail, true, validateEmail)} />
        <LLButton title="Next" onPress={handleSubmit} fullWidth style={{ marginTop: "auto" }} />
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
