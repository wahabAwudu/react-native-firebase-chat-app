import React, { ReactNode } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

type Props = {
  children: ReactNode;
  inChat?: boolean;
};
const CustomKeyboardView = ({ children, inChat = false }: Props) => {
  const ios: boolean = Platform.OS === "ios";

  let kavConfig = {};
  let scrollViewConfig = {};

  // these should only be set in chat.
  if (inChat) {
    kavConfig = { keyboardVerticalOffset: 90 };
    scrollViewConfig = { contentContainerStyle: { flex: 1 } };
  }

  return (
    <KeyboardAvoidingView
      behavior={ios ? "padding" : "height"}
      style={{ flex: 1 }}
      {...kavConfig}
    >
      <ScrollView
        style={{ flex: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
        {...scrollViewConfig}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CustomKeyboardView;
