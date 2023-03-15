import firebase from "firebase/auth";
import react, { createContext, useContext, useEffect, useState } from "react";
import { resetLocalStorage } from "../components/common/utils";
import { auth } from "../firebase";

interface AuthContextProps {
  currentUser: firebase.User | null | undefined;
  signUp: (email: string, password: string) => void;
  loginIn: (email: string, password: string) => Promise<any>;
  resetPassword: (email: string) => Promise<void>;
  logOut: () => Promise<void>;
}
const AuthContext = createContext<any>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = (props: {
  children:
    | string
    | number
    | boolean
    | react.ReactElement<any, string | react.JSXElementConstructor<any>>
    | react.ReactFragment
    | react.ReactPortal
    | null
    | undefined;
}) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>();

  const signUp = (email: string, password: string) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const loginIn = (email: string, password: string) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const resetPassword = (email: string) => {
    return auth.sendPasswordResetEmail(email);
  };

  const logOut = () => {
    resetLocalStorage()
    return auth.signOut();
  };
  useEffect(() => {
    const authUnSubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user as any);
    });

    return authUnSubscribe;
  }, []);

  const value = {
    currentUser,
    signUp,
    loginIn,
    resetPassword,
    logOut,
  };

  return (
    <AuthContext.Provider value={value as any}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
