import React, {
  createContext,
  PropsWithChildren,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import {
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { addDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { Alert } from "react-native";

type AuthProps = {
  isAuthenticated: boolean | undefined;
  user: UserProps | null;
  login: (email: string, password: string) => object;
  signup: (
    email: string,
    password: string,
    username: string,
    profileUrl: string
  ) => object;
  logout: () => object;
};

export const AuthContext = createContext<AuthProps>({
  isAuthenticated: undefined,
  user: null,
  login: (email: string, password: string) => {
    return {};
  },
  signup: (
    email: string,
    password: string,
    username: string,
    profileUrl: string
  ) => {
    return {};
  },
  logout: () => {
    return {};
  },
});

type Props = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<any>(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser({
          uid: user.uid,
          email: user.email,
        });
        updateUserData(user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });

    return unsub;
  }, []);

  const updateUserData = async (authUser: User) => {
    const docRef = doc(db, "users", authUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let data = docSnap.data();

      setUser({
        ...authUser,
        uid: authUser.uid,
        email: authUser.email,
        username: data.username,
        profileUrl: data.profileUrl,
      });
    }
  };

  const handleAuthErrors = (errorMessage: any) => {
    if (errorMessage.includes("auth/invalid-email"))
      return "Your email is invalid";
    if (errorMessage.includes("auth/invalid-password"))
      return "Your password is invalid";
    if (errorMessage.includes("auth/invalid-credential"))
      return "Email or password is invalid";
    if (errorMessage.includes("auth/email-already-in-use"))
      return "This email is already in use";
    return "Something went wrong, kindly retry";
  };

  const login = async (email: string, password: string) => {
    try {
      const resp = await signInWithEmailAndPassword(auth, email, password);

      return { success: true, data: resp.user };
    } catch (e: any) {
      return { success: false, message: handleAuthErrors(e.message) };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (e: any) {
      return { success: false, msg: e.message };
    }
  };

  const signup = async (
    email: string,
    password: string,
    username: string,
    profileUrl: string
  ) => {
    try {
      const resp = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", resp.user.uid), {
        username,
        profileUrl,
        userId: resp.user.uid,
      });
      return { success: true, data: resp.user };
    } catch (e: any) {
      return { success: false, message: handleAuthErrors(e.message) };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: user,
        isAuthenticated,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be wrapped inside AuthContextProvider");
  }
  return value;
};
