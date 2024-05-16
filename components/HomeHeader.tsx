import { Image } from "expo-image";
import React from "react";
import { View, Text, Platform } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { blurhash } from "../utils/common";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import CustomMenuItems from "./CustomMenuItems";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useAuth } from "../context/authContext";
import CustomDivider from "./common/CustomDivider";

const ios = Platform.OS === "ios";

const HomeHeader = () => {
  const { top } = useSafeAreaInsets();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View
      style={{ paddingTop: ios ? top : top + 10 }}
      className="flex-row justify-between px-5 bg-indigo-400 pb-6 rounded-b-3xl shadow"
    >
      <View>
        <Text style={{ fontSize: hp(3) }} className="font-medium text-white">
          Chats
        </Text>
      </View>

      <View>
        <Menu>
          <MenuTrigger
            customStyles={{
              triggerWrapper: {
                // custom styles here ...
              },
            }}
          >
            <Image
              style={{ height: hp(4.3), aspectRatio: 1, borderRadius: 100 }}
              source="https://picsum.photos/seed/696/3000/2000"
              placeholder={blurhash}
              transition={500}
            />
          </MenuTrigger>
          <MenuOptions
            customStyles={{
              optionsContainer: {
                borderRadius: 10,
                borderCurve: "continuous",
                marginTop: 45,
                marginRight: 0,
                backgroundColor: "white",
                shadowOpacity: 0.2,
                shadowOffset: { width: 0, height: 0 },
                width: 160,
              },
            }}
          >
            <CustomMenuItems
              text="Profile"
              value="profile"
              action={(value) => {}}
              icon={<Feather name="user" size={hp(1.8)} color="#737373" />}
            />
            <CustomDivider />
            <CustomMenuItems
              text="Logout"
              value="logout"
              action={handleLogout}
              icon={<AntDesign name="logout" size={hp(1.8)} color="#737373" />}
            />
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
};

export default HomeHeader;
