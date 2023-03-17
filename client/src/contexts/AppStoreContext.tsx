import react, { createContext, useContext, useEffect, useState } from "react";

const AppStoreContext = createContext<any>(null);

export const useAppStore = () => {
  return useContext(AppStoreContext);
};

const AppStoreProvider = (props: {
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
  const [AppStoreData, setAppStoreData] = useState();

  const value = {
    AppStoreData: AppStoreData,
    setAppStoreData: setAppStoreData,
  };

  return (
    <AppStoreContext.Provider value={value as any}>
      {props.children}
    </AppStoreContext.Provider>
  );
};

export default AppStoreProvider;
