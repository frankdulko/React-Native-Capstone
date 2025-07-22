import { Colors } from "@/constants/Colors";
import Checkbox from "expo-checkbox";
import { Controller, ControllerProps, FieldValues } from "react-hook-form";

type ControlledCheckboxProps<TFieldValues extends FieldValues> = Omit<ControllerProps<TFieldValues>, "render">;

export default function ControlledCheckbox<TFieldValues extends FieldValues>({ name, control, rules }: ControlledCheckboxProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <Checkbox value={value} onValueChange={onChange} style={{ marginBottom: 16 }} color={value ? Colors.primary.green : undefined} />
      )}
    />
  );
}
