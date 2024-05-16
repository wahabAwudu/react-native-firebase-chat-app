import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Router, useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import ChatRoomHeader from "../../components/Chat/ChatRoomHeader";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MessageList from "../../components/Chat/MessageList";
import { Feather } from "@expo/vector-icons";
import CustomKeyboardView from "../../components/CustomKeyboardView";
import { User } from "firebase/auth";
import { useAuth } from "../../context/authContext";
import { getRoomId } from "../../utils/common";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

const chatRoom = () => {
  const item: UserProfileProps = useLocalSearchParams();
  const router: Router = useRouter();
  const { user } = useAuth(); // logged in user
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [isNewMessage, setIsNewMessage] = useState<boolean>(false);
  const [currentRoom, setCurrentRoom] = useState<string>("");
  const [text, setText] = useState<string>("");
  const textRef = useRef("");
  const inputRef = useRef(null);

  const handleSendMessage = async () => {
    let message = text.trim();
    if (!message) return;
    setCurrentRoom(getRoomId(user?.uid, item.userId));

    try {
      const docRef = doc(db, "rooms", currentRoom);
      const messageRef = collection(docRef, "messages");

      const newDoc = await addDoc(messageRef, {
        userId: user?.uid,
        message,
        profileUrl: user?.profileUrl,
        senderName: user?.username,
        createdAt: Timestamp.fromDate(new Date()),
      });
      setText("");
      setIsNewMessage(true);

      console.log("New message: ", message);
    } catch (err: any) {
      Alert.alert("Message", err.message);
    }
  };

  const createRoom = async () => {
    // room id
    let roomId = getRoomId(user?.uid, item.userId);
    await setDoc(doc(db, "rooms", roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date()),
    });
    setCurrentRoom(roomId);
  };

  const convertDate = (seconds: number) => {
    return new Date(1000 * seconds);
  };

  const syncMessages = () => {
    if (!currentRoom) return;
    console.log("Sync messages");
    const docRef = doc(db, "rooms", currentRoom);
    const messagesRef = collection(docRef, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const allMessages: DocumentData[] = snapshot.docs.map((doc_) => {
        return doc_.data();
      });

      setMessages(
        allMessages.map((msg) => {
          return {
            userId: msg.userId,
            message: msg.message,
            profileUrl: msg.profileUrl,
            senderName: msg.senderName,
            createdAt: convertDate(msg.createdAt.seconds),
          };
        })
      );

      setIsNewMessage(false);
    });
    return unsub;
  };

  useEffect(() => {
    if (user?.uid) {
      createRoom();
    }
  }, [user?.uid]);

  useEffect(() => {
    if (!currentRoom) setCurrentRoom(getRoomId(user?.uid, item.userId));
    if (currentRoom || isNewMessage) syncMessages();
  }, [currentRoom, isNewMessage]);

  useEffect(() => {
    syncMessages();
  }, []);

  return (
    <CustomKeyboardView inChat={true}>
      <View className="flex-1 bg-white">
        <StatusBar style="dark" />
        <ChatRoomHeader user={item} router={router} />
        <View className="h-3 border-b border-neutral-300" />
        <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
          <View className="flex-1">
            <MessageList messages={messages} currentUser={user} />
          </View>
          <View style={{ marginBottom: hp(2.7) }} className="pt-2">
            <View className="flex-row justify-between bg-white mx-3 border p-2 border-neutral-300 rounded-full pl-5">
              <TextInput
                placeholder="Type message..."
                className="flex-1 mr-2"
                style={{ fontSize: hp(2) }}
                value={text}
                onChangeText={(value) => setText(value)}
              />
              <TouchableOpacity
                className="bg-neutral-200 p-2 mr-[1px] rounded-full"
                onPress={handleSendMessage}
              >
                <Feather name="send" size={hp(2.7)} color="#737373" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
};

export default chatRoom;
