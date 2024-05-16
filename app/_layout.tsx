import { Slot, useRouter, useSegments } from "expo-router";

import "../global.css";
import { View } from "react-native";
import {
  AuthContext,
  AuthContextProvider,
  useAuth,
} from "../context/authContext";
import { useEffect } from "react";
import { MenuProvider } from "react-native-popup-menu";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (typeof isAuthenticated === "undefined") return;

    const inApp = segments[0] === "navs";

    if (isAuthenticated && !inApp) {
      // redirect to home
      router.replace("/navs/home");
    } else if (!isAuthenticated) {
      // redirect to signin
      router.replace("/auth/signIn");
    }
  }, [isAuthenticated]);

  return (
    <>
      <Slot />
    </>
  );
};

const RootLayout = () => {
  return (
    <MenuProvider>
      <AuthContextProvider>
        <MainLayout />
      </AuthContextProvider>
    </MenuProvider>
  );
};
export default RootLayout;
