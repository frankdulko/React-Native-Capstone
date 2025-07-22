import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getOnboardingState() {
  return (await AsyncStorage.getItem("onboardingState")) === "true";
}

export async function setOnboardingState(state: boolean) {
  return await AsyncStorage.setItem("onboardingState", state.toString());
}
