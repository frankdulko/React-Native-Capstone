import { MenuItem } from "@/app";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getOnboardingState() {
  return (await AsyncStorage.getItem("onboardingState")) === "true";
}

export async function setOnboardingState(state: boolean) {
  return await AsyncStorage.setItem("onboardingState", state.toString());
}

const API_URL = "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";

export const fetchMenuData = async () => {
  const menuItems = await fetch(API_URL)
    .then((response) => response.json())
    .then((data) => data.menu)
    .then((data) => {
      return data.map((item: MenuItem) => ({
        name: item.name,
        price: item.price,
        description: item.description,
        image: item.image,
        category: item.category,
      }));
    })
    .catch((error) => {
      throw new Error("Failed to fetch data: " + error.message);
    });

  return menuItems;
};
