import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { Router, useRouter } from "expo-router";
import Loading from "../../components/common/Loading";
import CustomKeyboardView from "../../components/CustomKeyboardView";
import { useAuth } from "../../context/authContext";

type SignUpProps = {
  success: boolean;
  message?: any;
  data?: any;
};

const SignUp = () => {
  const router: Router = useRouter();
  const { signup } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const emailRef = useRef("");
  const usernameRef = useRef("");
  const profileRef = useRef("");
  const passwordRef = useRef("");

  const handleRegister = async () => {
    if (
      !emailRef.current ||
      !passwordRef.current ||
      !usernameRef.current ||
      !profileRef.current
    ) {
      Alert.alert("Sign Up", "Please fill all the fields");
      return;
    }
    setLoading(true);
    let response: any = await signup(
      emailRef.current,
      passwordRef.current,
      usernameRef.current,
      profileRef.current
    );
    if (response?.success) {
      setLoading(false);
    } else {
      setLoading(false);
      Alert.alert("Sign Up", response.message);
    }
  };

  return (
    <CustomKeyboardView>
      <StatusBar style="dark" />
      <View
        className="flex-1 gap-12"
        style={{ paddingTop: hp(7), paddingHorizontal: wp(5) }}
      >
        <View className="items-center">
          <Image
            source={require("../../assets/images/register.png")}
            style={{ height: hp(20) }}
            resizeMode="contain"
          />
        </View>

        <View className="gap-10">
          <Text
            style={{ fontSize: hp(4) }}
            className="font-bold tracking-wider text-center text-neutral-800"
          >
            Sign Up
          </Text>
          <View className="gap-4">
            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"
            >
              <Octicons name="mail" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={(value) => (emailRef.current = value)}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder="Email address"
                placeholderTextColor="gray"
              />
            </View>

            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"
            >
              <MaterialCommunityIcons
                name="account"
                size={hp(2.7)}
                color="gray"
              />
              <TextInput
                onChangeText={(value) => (usernameRef.current = value)}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder="Username"
                placeholderTextColor="gray"
              />
            </View>

            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"
            >
              <Octicons name="lock" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={(value) => (passwordRef.current = value)}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder="Password"
                placeholderTextColor="gray"
                secureTextEntry
              />
            </View>

            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"
            >
              <MaterialCommunityIcons
                name="image"
                size={hp(2.7)}
                color="gray"
              />
              <TextInput
                onChangeText={(value) => (profileRef.current = value)}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder="Profile url"
                placeholderTextColor="gray"
              />
            </View>

            <View>
              {!loading ? (
                <TouchableOpacity
                  className="bg-indigo-500 rounded-xl justify-center items-center"
                  style={{ height: hp(6.5) }}
                  onPress={handleRegister}
                >
                  <Text
                    style={{ fontSize: hp(2.7) }}
                    className="text-white font-bold tracking-wider"
                  >
                    Sign Up
                  </Text>
                </TouchableOpacity>
              ) : (
                <View className="flex-row justify-center">
                  <Loading size={hp(6.5)} />
                </View>
              )}
            </View>

            <View className="flex-row justify-center">
              <Text
                style={{ fontSize: hp(1.8) }}
                className="font-semibold text-neutral-500"
              >
                Already have an account?
              </Text>
              <Pressable onPress={() => router.push("/auth/signIn")}>
                <Text
                  style={{ fontSize: hp(1.8) }}
                  className="font-bold text-indigo-500"
                >
                  Sign In
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
};

export default SignUp;
