import Header from "@/components/Header";
import LLButton from "@/components/LLButton";
import LLText from "@/components/LLText";
import LLTextInput from "@/components/LLTextInput";
import { Colors } from "@/constants/Colors";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Header backButton />
        <View style={{ marginHorizontal: 16 }}>
          <LLText size="lg" color="black" weight="bold">
            Personal Information
          </LLText>
          <View style={styles.container}>
            <LLText size="sm" color="info" weight="bold" style={{ marginBottom: 8 }}>
              Avatar
            </LLText>
            <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
              <View style={{ width: 50, height: 50, borderRadius: 50, backgroundColor: Colors.primary.green }}></View>
              <LLButton
                title={"Change"}
                buttonSize="md"
                onPress={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
              <LLButton
                title={"Remove"}
                buttonSize="md"
                buttonType="secondary"
                onPress={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </View>
          </View>
          <View style={styles.container}>
            <LLText size="sm" color="info" weight="bold" style={{ marginBottom: 8 }}>
              First Name
            </LLText>
            <LLTextInput />
          </View>
          <View style={styles.container}>
            <LLText size="sm" color="info" weight="bold" style={{ marginBottom: 8 }}>
              Last Name
            </LLText>
            <LLTextInput />
          </View>
          <View style={styles.container}>
            <LLText size="sm" color="info" weight="bold" style={{ marginBottom: 8 }}>
              Email
            </LLText>
            <LLTextInput />
          </View>
          <View style={styles.container}>
            <LLText size="sm" color="info" weight="bold" style={{ marginBottom: 8 }}>
              Phone Number
            </LLText>
            <LLTextInput />
          </View>
          <LLText size="lg" color="black" weight="bold">
            Email Notifications
          </LLText>
          <LLButton
            title={"Log Out"}
            buttonType="alert"
            fullWidth
            onPress={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
          <View style={{ flexDirection: "row", gap: 16, marginTop: 16 }}>
            <LLButton
              title={"Discard Changes"}
              buttonType="secondary"
              buttonSize="md"
              style={{ flex: 1 }}
              onPress={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
            <LLButton
              title={"Save Changes"}
              buttonSize="md"
              style={{ flex: 1 }}
              onPress={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
});
