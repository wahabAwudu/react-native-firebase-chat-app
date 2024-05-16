import { View, Text } from "react-native";
import React from "react";
import { User } from "firebase/auth";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

type Props = {
  message: MessageProps;
  currentUser: UserProps | null;
};

const MessageItem = ({ message, currentUser }: Props) => {
  if (currentUser?.uid === message.userId) {
    // current user message
    return (
      <View className="flex-row justify-end mb-3 mr-3">
        <View style={{ width: wp(80) }}>
          <View className="flex self-end p-3 rounded-2xl bg-indigo-500 border border-indigo-500">
            <Text className="text-white" style={{ fontSize: hp(1.9) }}>
              {message.message}
            </Text>
          </View>
        </View>
      </View>
    );
  } else {
    // other user message
    return (
      <View className="flex-row justify-start mb-3 ml-3">
        <View style={{ width: wp(80) }}>
          <View className="flex self-start p-3 rounded-2xl bg-white border border-white">
            <Text className="text-indigo-500" style={{ fontSize: hp(1.9) }}>
              {message.message}
            </Text>
          </View>
        </View>
      </View>
    );
  }
};

export default MessageItem;
