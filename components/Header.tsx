import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Image, Pressable, View } from "react-native";
import IconButton from "./IconButton";

interface HeaderProps {
  backButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ backButton = false }) => {
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
          style={{ width: 50, height: 50, borderRadius: 50, backgroundColor: Colors.primary.green, marginLeft: "auto" }}
          onPress={() => {
            router.push("/profile");
          }}
        />
      </View>
    </View>
  );
};

export default Header;
