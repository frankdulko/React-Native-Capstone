import React from "react";
import { Controller, ControllerProps, FieldValues } from "react-hook-form";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";

interface LLTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export interface Input {
  value: string;
  error?: string;
}

const LLTextInput: React.FC<LLTextInputProps> = ({ label, error, style, ...props }) => {
  return (
    <View style={styles.container}>
      <TextInput style={[styles.input, style, error ? styles.errorInput : null]} {...props} />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

type ControlledLLTextInputProps<TFieldValues extends FieldValues> = Omit<ControllerProps<TFieldValues>, "render"> & TextInputProps;

export function ControlledLLTextInput<TFieldValues extends FieldValues>({
  name,
  control,
  rules,
  keyboardType,
}: ControlledLLTextInputProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <View style={styles.container}>
          <TextInput style={[styles.input, error ? styles.errorInput : null]} value={value} onChangeText={onChange} keyboardType={keyboardType} />
          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 8,
    fontSize: 18,
    padding: 12,
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: "red",
  },
});

export default LLTextInput;
