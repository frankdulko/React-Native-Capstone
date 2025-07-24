import ControlledCheckbox from "@/components/ControlledCheckbox";
import Header from "@/components/Header";
import LLButton from "@/components/LLButton";
import LLText from "@/components/LLText";
import { ControlledLLTextInput } from "@/components/LLTextInput";
import { Colors } from "@/constants/Colors";
import { setOnboardingState } from "@/constants/helpers";
import { useAppContext, UserData } from "@/hooks/useAppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Image, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

type ProfileForm = UserData;

export default function ProfileScreen() {
  const { userData, updateUserData } = useAppContext();
  const phoneRegex = /^(\+?1[-.\s]?)?(?:\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      return result.assets[0].uri;
    }
  };

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
      avatar: userData?.avatar || undefined,
    },
  });

  const onSubmit = async (data: ProfileForm) => {
    await updateUserData(data);
    console.log("Form submitted.");
  };

  const handleLogOut = async () => {
    router.replace("/onboarding");
    await setOnboardingState(false);
    await AsyncStorage.removeItem("userData");
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
            <Controller
              control={control}
              name="avatar"
              render={({ field: { onChange, value } }) => (
                <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
                  {value ? (
                    <Image source={{ uri: value }} style={{ width: 50, height: 50, borderRadius: 50 }} />
                  ) : (
                    <View style={{ width: 50, height: 50, borderRadius: 50, backgroundColor: Colors.secondary.orange }}>
                      <LLText size="md" color="white" weight="bold" style={{ textAlign: "center", lineHeight: 50 }}>
                        {userData?.firstName?.charAt(0) + (userData?.lastName?.charAt(0) || "")}
                      </LLText>
                    </View>
                  )}
                  <LLButton
                    title={"Change"}
                    buttonSize="md"
                    onPress={async () => {
                      const image = await pickImage();
                      if (image) {
                        onChange(image);
                      }
                    }}
                  />
                  <LLButton title={"Remove"} buttonSize="md" buttonType="secondary" onPress={() => onChange(undefined)} />
                </View>
              )}
            />
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
          <View style={styles.container}>
            <LLText size="sm" color="info" weight="bold" style={{ marginBottom: 8 }}>
              Phone Number
            </LLText>
            <ControlledLLTextInput
              name="phoneNumber"
              control={control}
              rules={{
                pattern: phoneRegex,
              }}
            />
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
          <LLButton title={"Log Out"} buttonType="alert" fullWidth onPress={handleLogOut} />
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
