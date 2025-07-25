import LLButton from "@/components/LLButton";
import LLText from "@/components/LLText";
import { ControlledLLTextInput } from "@/components/LLTextInput";
import { setOnboardingState } from "@/constants/helpers";
import { useAppContext, UserData } from "@/hooks/useAppContext";
import { router } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { Image, SafeAreaView, StyleSheet, View } from "react-native";

type OnboardingForm = Pick<UserData, "firstName" | "email">;

export default function OnboardingScreen() {
  const { updateUserData } = useAppContext();
  const { control, handleSubmit } = useForm<OnboardingForm>({ defaultValues: { firstName: "", email: "" } });

  const submitForm = async (data: OnboardingForm) => {
    updateUserData(data)
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
        <Image source={require("../assets/images/Logo.png")} resizeMode="contain" style={{ height: 50, width: "100%" }} />
      </View>
      <View style={styles.main}>
        <LLText size="xxl" color="primary" weight="black" style={{ marginBottom: 20 }}>
          Welcome
        </LLText>
        <LLText size="xl" color="black" weight="medium" style={{ marginBottom: 20 }}>
          Let us get to know you!
        </LLText>
        <View style={styles.container}>
          <LLText size="sm" color="info" weight="bold" style={{ marginBottom: 8 }}>
            First Name
          </LLText>
          <ControlledLLTextInput name="firstName" control={control} rules={{ required: "First name is required." }} />
        </View>
        <View style={styles.container}>
          <LLText size="sm" color="info" weight="bold" style={{ marginBottom: 8 }}>
            Email
          </LLText>
          <ControlledLLTextInput
            name="email"
            control={control}
            rules={{
              required: "Email is required.",
              validate: (value, _formValues) => {
                if (typeof value !== "string") {
                  return "Please enter a valid email address.";
                }
                // at this point TypeScript knows `value` is string
                const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
                return emailRegex.test(value) ? true : "Please enter a valid email address.";
              },
            }}
          />
        </View>
        <LLButton title="Next" onPress={handleSubmit(submitForm)} fullWidth style={{ marginTop: "auto" }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 10,
  },
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    marginTop: "auto",
  },
  container: {
    marginVertical: 8,
    width: "100%",
  },
});
