import React from "react";
import react, { createContext, useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NotificationProps, NotificationStatus } from "../components/common/utils";
interface NotificationContexProps {
 showNotificationOpen: boolean,
 setShowNotificationOpen: ()=> void
}
const NotificationContex = createContext<any>(null);

export const useNotification = () => {
  return useContext(NotificationContex);
};


const NotificationProvider = (props: {
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
  const [showNotification, setShowNotification] = useState<NotificationProps>({
    status: NotificationStatus.DEFAULT,
    alertMessage: "This is sample alert..!",
    showAlert:false
  });

  
  const showNotifications = () => {
    if(showNotification.showAlert){
      switch (showNotification.status) {
        case NotificationStatus.SUCCESS:
          toast.success(showNotification.alertMessage);
          break;
        case NotificationStatus.ERROR:
          toast.error(showNotification.alertMessage);
          break;
        case NotificationStatus.WARNING:
          toast.warn(showNotification.alertMessage);
          break;
        case NotificationStatus.INFO:
          toast.info(showNotification.alertMessage);
          break;
        default:
          toast.info(showNotification.alertMessage);
          break;
      }
    }
  };

  

  React.useEffect(()=>{
    showNotifications()
  },[showNotification.showAlert])


  const value = {
    showNotification: showNotification,
    setShowNotification: setShowNotification
  };

  return (
    <NotificationContex.Provider value={value as any}>
      {props.children}
      <ToastContainer />
    </NotificationContex.Provider>
  );
};

export default NotificationProvider;
