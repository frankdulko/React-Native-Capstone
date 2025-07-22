import ControlledCheckbox from "@/components/ControlledCheckbox";
import Header from "@/components/Header";
import LLButton from "@/components/LLButton";
import LLText from "@/components/LLText";
import { ControlledLLTextInput } from "@/components/LLTextInput";
import { Colors } from "@/constants/Colors";
import { useAppContext, UserData } from "@/hooks/useAppContext";
import { useForm } from "react-hook-form";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

type ProfileForm = UserData;

export default function ProfileScreen() {
  const { userData, updateUserData } = useAppContext();

  const { control, handleSubmit, reset } = useForm<ProfileForm>({
    defaultValues: {
      firstName: userData?.firstName || "",
      lastName: userData?.lastName || "",
      email: userData?.email || "",
      phoneNumber: userData?.phoneNumber || "",
      notifications: {
        status: userData?.notifications?.status || false,
        passwordChange: userData?.notifications?.passwordChange || false,
        specialOffers: userData?.notifications?.specialOffers || false,
        newsletter: userData?.notifications?.newsletter || false,
      },
    },
  });

  const onSubmit = async (data: ProfileForm) => {
    await updateUserData(data);
    console.log("Form submitted.");
  };

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
            <ControlledLLTextInput name="firstName" control={control} rules={{ required: "First name is required." }} />
          </View>
          <View style={styles.container}>
            <LLText size="sm" color="info" weight="bold" style={{ marginBottom: 8 }}>
              Last Name
            </LLText>
            <ControlledLLTextInput name="lastName" control={control} />
          </View>
          <View style={styles.container}>
            <LLText size="sm" color="info" weight="bold" style={{ marginBottom: 8 }}>
              Email
            </LLText>
            <ControlledLLTextInput name="email" control={control} rules={{ required: "Email is required." }} />
          </View>
          <View style={styles.container}>
            <LLText size="sm" color="info" weight="bold" style={{ marginBottom: 8 }}>
              Phone Number
            </LLText>
            <ControlledLLTextInput name="phoneNumber" control={control} rules={{ required: "Email is required." }} />
          </View>
          <View style={styles.container}>
            <LLText size="lg" color="black" weight="bold">
              Email Notifications
            </LLText>
          </View>
          <View style={[styles.container, { flexDirection: "row" }]}>
            <ControlledCheckbox name="notifications.status" control={control} />
            <LLText size="md" color="black" style={{ marginLeft: 8 }}>
              Order statuses
            </LLText>
          </View>
          <View style={[styles.container, { flexDirection: "row" }]}>
            <ControlledCheckbox name="notifications.passwordChange" control={control} />
            <LLText size="md" color="black" style={{ marginLeft: 8 }}>
              Password changes
            </LLText>
          </View>
          <View style={[styles.container, { flexDirection: "row" }]}>
            <ControlledCheckbox name="notifications.specialOffers" control={control} />
            <LLText size="md" color="black" style={{ marginLeft: 8 }}>
              Special offers
            </LLText>
          </View>
          <View style={[styles.container, { flexDirection: "row" }]}>
            <ControlledCheckbox name="notifications.newsletter" control={control} />
            <LLText size="md" color="black" style={{ marginLeft: 8 }}>
              Newsletter
            </LLText>
          </View>
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
              onPress={() =>
                reset({
                  firstName: userData?.firstName || "",
                  lastName: userData?.lastName || "",
                  email: userData?.email || "",
                  phoneNumber: userData?.phoneNumber || "",
                  notifications: {
                    status: userData?.notifications?.status || false,
                    passwordChange: userData?.notifications?.passwordChange || false,
                    specialOffers: userData?.notifications?.specialOffers || false,
                    newsletter: userData?.notifications?.newsletter || false,
                  },
                })
              }
            />
            <LLButton title={"Save Changes"} buttonSize="md" style={{ flex: 1 }} onPress={handleSubmit(onSubmit)} />
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
