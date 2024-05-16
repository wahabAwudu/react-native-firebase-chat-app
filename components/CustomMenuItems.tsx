import React from "react";
import { View, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MenuOption } from "react-native-popup-menu";

type Props = {
  text: string;
  action: (value: any) => void;
  value: any;
  icon: any;
};

const CustomMenuItems = ({ text, action, value, icon }: Props) => {
  return (
    <MenuOption onSelect={() => action(value)}>
      <View className="px-4 py-1 flex-row justify-between items-center">
        <Text
          style={{ fontSize: hp(1.7) }}
          className="font-semibold text-neutral-600"
        >
          {text}
        </Text>
        <Text>{icon}</Text>
      </View>
    </MenuOption>
  );
};

export default CustomMenuItems;
