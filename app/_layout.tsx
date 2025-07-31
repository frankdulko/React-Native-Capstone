import { useFonts } from "expo-font";
import { router, Stack, usePathname } from "expo-router";
import "react-native-reanimated";

import { getOnboardingState } from "@/constants/helpers";
import { AppProvider } from "@/hooks/useAppContext";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const [checked, setChecked] = useState(false);
  const pathname = usePathname();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    async function init() {
      const didCompleteOnboarding = await getOnboardingState();
      if (!didCompleteOnboarding && pathname !== "/onboarding") {
        router.replace("/onboarding");
      }
      setChecked(true);
    }
    init();
  }, []);

  if (!loaded || !checked) {
    return null; // or your splash screen
  }

  return (
    <AppProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </AppProvider>
  );
}
