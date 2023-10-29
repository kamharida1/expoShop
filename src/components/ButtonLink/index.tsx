import { Text } from "moti";
import React, { memo } from "react";
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    marginVertical: 30,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  h: {
    textDecorationLine: "underline",
    color: "red",
  },
});

interface ButtonLinkT {
  title: string;
  viewStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  textStyle?: StyleProp<TextStyle>;
}

const ButtonLink = memo<ButtonLinkT>(
  ({ title, viewStyle, textStyle, onPress }) => {
    const { container, h } = styles;
    return (
      <TouchableOpacity onPress={onPress} style={[container, viewStyle]}>
        <Text
          style={{
            color: "#fff",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
);

export { ButtonLink };
