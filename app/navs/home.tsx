import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert, ActivityIndicator } from "react-native";
import { useAuth } from "../../context/authContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import ChatList from "../../components/Chat/ChatList";
import { getDocs, query, where } from "firebase/firestore";
import { usersRef } from "../../firebaseConfig";

const Home = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserProfileProps[]>([]);

  const getUsers = async () => {
    const q = query(usersRef, where("userId", "!=", user?.uid));
    const querySnapshot = await getDocs(q);

    let data: any[] = [];
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data() });
    });

    setUsers(data);
  };

  useEffect(() => {
    if (user?.uid) {
      getUsers();
    }
  }, []);

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />

      {users.length ? (
        <ChatList users={users} />
      ) : (
        <View className="flex items-center" style={{ top: hp(30) }}>
          <ActivityIndicator size={"large"} />
        </View>
      )}
    </View>
  );
};

export default Home;
