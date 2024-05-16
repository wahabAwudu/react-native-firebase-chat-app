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
import { Octicons } from "@expo/vector-icons";
import { Router, useRouter } from "expo-router";
import Loading from "../../components/common/Loading";
import CustomKeyboardView from "../../components/CustomKeyboardView";
import { useAuth } from "../../context/authContext";

const signIn = () => {
  const router: Router = useRouter();
  const { login } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Sign In", "Please fill all the fields");
      return;
    }

    setLoading(true);
    let response: any = await login(emailRef.current, passwordRef.current);
    if (response?.success) {
      setLoading(false);
    } else {
      setLoading(false);
      Alert.alert("Sign In", response.message);
    }
  };

  return (
    <CustomKeyboardView>
      <StatusBar style="dark" />
      <View
        className="flex-1 gap-12"
        style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }}
      >
        <View className="items-center">
          <Image
            source={require("../../assets/images/login.png")}
            style={{ height: hp(25) }}
            resizeMode="contain"
          />
        </View>

        <View className="gap-10">
          <Text
            style={{ fontSize: hp(4) }}
            className="font-bold tracking-wider text-center text-neutral-800"
          >
            Sign In
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
            <View className="gap-3">
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
              <Text
                style={{ fontSize: hp(1.8) }}
                className="font-semibold text-right text-neutral-500"
              >
                Forgot password?
              </Text>
            </View>

            <View>
              {!loading ? (
                <TouchableOpacity
                  className="bg-indigo-500 rounded-xl justify-center items-center"
                  style={{ height: hp(6.5) }}
                  onPress={handleLogin}
                >
                  <Text
                    style={{ fontSize: hp(2.7) }}
                    className="text-white font-bold tracking-wider"
                  >
                    Sign In
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
                Don't have an account?
              </Text>
              <Pressable onPress={() => router.push("/auth/signUp")}>
                <Text
                  style={{ fontSize: hp(1.8) }}
                  className="font-bold text-indigo-500"
                >
                  Sign Up
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
};

export default signIn;
