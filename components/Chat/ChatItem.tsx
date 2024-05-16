import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Router, useRouter } from "expo-router";
import { Image } from "expo-image";
import { blurhash } from "../../utils/common";

type Props = {
  item: UserProfileProps;
  index: any;
  noBoarder: boolean;
  router: Router;
};

const ChatItem = ({ item, index, noBoarder }: Props) => {
  const router = useRouter();

  const openChatRoom = () => {
    router.push({ pathname: "/navs/chatRoom", params: item });
  };

  return (
    <TouchableOpacity
      className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 ${
        noBoarder ? "" : "border-b border-b-neutral-200"
      }`}
      onPress={openChatRoom}
    >
      <Image
        style={{ height: hp(6), width: hp(6), borderRadius: 100 }}
        source="https://picsum.photos/seed/696/3000/2000"
        placeholder={blurhash}
        transition={500}
        className="rounded-full"
      />
      <View className="flex-1 gap-1">
        <View className="flex-row justify-between">
          <Text
            style={{ fontSize: hp(1.8) }}
            className="font-semibold text-neutral-800"
          >
            {item.username}
          </Text>

          <Text
            style={{ fontSize: hp(1.6) }}
            className="font-medium text-neutral-500"
          >
            Time
          </Text>
        </View>

        <Text
          style={{ fontSize: hp(1.6) }}
          className="font-medium text-neutral-500"
        >
          Last message
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
