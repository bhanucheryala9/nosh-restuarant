import react, { createContext, useContext, useEffect, useState } from "react";

const UserContex = createContext<any>(null);

export const useUser = () => {
  return useContext(UserContex);
};

const UserProvider = (props: {
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
  const [userData, setUserData] = useState();
  const [isUserLoggedIn, setUserLoggedIn] = useState();

  const value = {
    userData: userData,
    setUserData: setUserData,
    setUserLoggedIn: setUserLoggedIn,
    isUserLoggedIn: isUserLoggedIn,
  };

  return (
    <UserContex.Provider value={value as any}>
      {props.children}
    </UserContex.Provider>
  );
};

export default UserProvider;
