import { Colors } from "@/constants/Colors";
import { useAppContext } from "@/hooks/useAppContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, usePathname } from "expo-router";
import { Image, Pressable, View } from "react-native";
import IconButton from "./IconButton";
import LLText from "./LLText";

interface HeaderProps {
  backButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ backButton = false }) => {
  const { userData } = useAppContext();
  const pathname = usePathname();
  return (
    <View style={{ flexDirection: "row", height: 50, marginHorizontal: 16 }}>
      <View style={{ flex: 1 }}>
        {backButton && (
          <IconButton
            onPress={() => {
              router.back();
            }}
          >
            <Ionicons name="arrow-back-outline" size={24} color="white" />
          </IconButton>
        )}
      </View>
      <View style={{ flex: 2, alignItems: "center", justifyContent: "center" }}>
        <Image source={require("../assets/images/Logo.png")} resizeMode="contain" />
      </View>
      <View style={{ flex: 1 }}>
        <Pressable
          style={{ marginLeft: "auto" }}
          onPress={() => {
            pathname != "/profile" && router.push("/profile");
          }}
        >
          {userData?.avatar && userData?.avatar != "" ? (
            <Image source={{ uri: userData.avatar }} style={{ width: 50, height: 50, borderRadius: 50 }} />
          ) : (
            <View style={{ width: 50, height: 50, borderRadius: 50, backgroundColor: Colors.secondary.orange }}>
              <LLText size="md" color="white" weight="bold" style={{ textAlign: "center", lineHeight: 50 }}>
                {userData?.firstName?.charAt(0) + (userData?.lastName?.charAt(0) || "")}
              </LLText>
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default Header;
