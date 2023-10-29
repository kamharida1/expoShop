import React from "react";
import { ActivityIndicator, Button, Pressable, View, ViewStyle } from "react-native";
import { useFormikContext } from "formik";
import { Text } from "moti";
import { MotiPressable } from "moti/interactions";

interface AppFormSubmitButtonProps {
  title: string;
  disabled?: boolean;
  style?: ViewStyle;
  loading?: boolean;
  textStyle?: ViewStyle;
}
const ButtonSubmit = ({
  title,
  disabled,
  loading,
  style,
  textStyle,
}: AppFormSubmitButtonProps) => {
  const { handleSubmit, isValid } = useFormikContext();
  // return <Button  onPress={() => handleSubmit()} title={title} disabled={!isValid} />;
  return (
    <MotiPressable
      style={[
        {
          marginTop: 20,
          backgroundColor: "#000",
          borderRadius: 13,
          padding: 15,
          width: "100%",
          alignItems: "center",
        },
        style,
      ]}
      from={{
        opacity: 0,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        type: "timing",
        duration: 500,
      }}
      onPress={() => handleSubmit()}
      disabled={(!isValid && disabled)}
    >
      <Text
        style={[{ color: "#fff", fontSize: 16, fontWeight: "bold" }, textStyle]}
      >
        {title}
      </Text>
    </MotiPressable>
  );
};
export { ButtonSubmit };
