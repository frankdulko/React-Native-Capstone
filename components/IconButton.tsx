import { Colors } from "@/constants/Colors";
import { Pressable, View } from "react-native";

interface IconButtonProps {
  onPress: () => void;
  style?: object; // Optional style prop
}
const IconButton: React.FC<React.PropsWithChildren<IconButtonProps>> = ({ onPress, style, children }) => {
  return (
    <Pressable style={[{ width: 50, height: 50, alignItems: "center", justifyContent: "center" }]} onPress={onPress}>
      <View
        style={[
          { alignItems: "center", justifyContent: "center", backgroundColor: Colors.primary.green, width: 35, height: 35, borderRadius: 30 },
          style,
        ]}
      >
        {children}
      </View>
    </Pressable>
  );
};

export default IconButton;
