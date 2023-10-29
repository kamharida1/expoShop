import { Text, View } from "moti";
import { memo, useState } from "react";
import { Pressable, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const InputField = memo((props: any) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const {
    placeholder,
    icon,
    isPassword,
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props;

  const toggleSecureTextEntry = () => {
    setSecureTextEntry((prevState) => !prevState);
  };

  const hasError = errors[name] && touched[name];
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor: hasError ? "red" : "#D0D0D0",
          borderRadius: 5,
          padding: 15,
          marginTop: 10,
        }}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={25}
            color="black"
            style={{
              left: 15,
              right: 10,
              position: "absolute",
              zIndex: 1,
            }}
          />
        )}
        <TextInput
          value={value}
          placeholder={placeholder}
          onChangeText={(text) => onChange(name)(text)}
          onBlur={() => {
            setFieldTouched(name);
            onBlur(name);
          }}
          secureTextEntry={isPassword && secureTextEntry}
          autoCapitalize="none"
          autoCorrect={false}
          {...inputProps}
          style={{  flex: 1 }}
        />
        {isPassword && (
          <Pressable
            style={{
              position: "absolute",
              right: 10,
              top: 14,
              zIndex: 1,
            }}
            onPress={toggleSecureTextEntry}
          >
            <Ionicons
              name={secureTextEntry ? "md-eye-off" : "md-eye"}
              size={25}
              color="black"
            />
          </Pressable>
        )}
      </View>
      {hasError && (
        <Text style={{ color: "red", }}>
          {errors[name]}
        </Text>
      )}
    </>
  );
});

export { InputField };
