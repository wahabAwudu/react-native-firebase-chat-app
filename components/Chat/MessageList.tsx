import { View, Text, ScrollView } from "react-native";
import React from "react";
import MessageItem from "./MessageItem";

type Props = {
  messages: MessageProps[];
  currentUser: UserProps | null;
};

const MessageList = ({ messages, currentUser }: Props) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 10 }}
    >
      {messages.map((msg, index) => (
        <MessageItem message={msg} key={index} currentUser={currentUser} />
      ))}
    </ScrollView>
  );
};

export default MessageList;
