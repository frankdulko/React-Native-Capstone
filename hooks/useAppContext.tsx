import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useState } from "react";

export interface UserData {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  notifications?: {
    status?: boolean;
    passwordChange?: boolean;
    specialOffers?: boolean;
    newsletter?: boolean;
  };
  avatar?: string;
}

interface AppContextType {
  userData?: UserData;
  updateUserData: (data: Partial<UserData>) => Promise<void>;
  loadUserData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return ctx;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<UserData>();

  const loadUserData = async () => {
    try {
      const data = await AsyncStorage.getItem("userData");
      if (data) {
        setUserData(JSON.parse(data));
        console.log("User data loaded:", JSON.parse(data));
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const updateUserData = async (data: Partial<UserData>) => {
    await AsyncStorage.mergeItem("userData", JSON.stringify(data));
    setUserData((prev) => ({ ...prev, ...data }));
    console.log("User data updated:", data);
  };

  const value = {
    userData,
    updateUserData,
    loadUserData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
