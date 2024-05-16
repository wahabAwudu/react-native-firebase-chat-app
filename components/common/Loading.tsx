import React from "react";
import { View, Text } from "react-native";
import LottieView from "lottie-react-native";

type Props = {
  size: any;
};

const Loading = ({ size }: Props) => {
  return (
    <View style={{ height: size, aspectRatio: 1 }}>
      <LottieView
        style={{ flex: 1 }}
        source={require("../../assets/images/loading.json")}
        autoPlay
        loop
      />
    </View>
  );
};

export default Loading;
