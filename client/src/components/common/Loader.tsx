import { Spin } from "antd";
import { createContext, FC, useContext, useState } from "react";
// import { LoaderProps } from "./utils";

interface LoaderProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadingMessage?: React.Dispatch<React.SetStateAction<string>>;
}
export const AntdLoaderContext = createContext<any>(null);
// export const useLoader = () => {
//   return useContext(AntdLoaderContext);
// };
const Loader = (props: any) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>("");
  const value = {
    setLoading,
    setLoadingMessage,
  };
  return (
    <AntdLoaderContext.Provider value={value}>
      <Spin tip={loadingMessage} size="default" spinning={isLoading}>
        {props.children}
      </Spin>
    </AntdLoaderContext.Provider>
  );
};

export default Loader;
