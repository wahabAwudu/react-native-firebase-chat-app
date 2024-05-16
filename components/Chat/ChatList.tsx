import { View, Text, FlatList } from "react-native";
import React from "react";
import ChatItem from "./ChatItem";
import { useRouter } from "expo-router";

type Props = {
  users: UserProfileProps[];
};

const ChatList = ({ users }: Props) => {
  const router = useRouter();
  return (
    <View className="flex-1">
      <FlatList
        data={users}
        contentContainerStyle={{ flex: 1, paddingVertical: 25 }}
        keyExtractor={(item) => item.userId}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ChatItem
            item={item}
            index={index}
            noBoarder={index + 1 === users.length}
            router={router}
          />
        )}
      />
    </View>
  );
};

export default ChatList;
