import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyAj53hpnruvqcpPGKwnfQoz0QKuczBg0As",
  authDomain: "restaurant-e2dec.firebaseapp.com",
  projectId: "restaurant-e2dec",
  storageBucket: "restaurant-e2dec.appspot.com",
  messagingSenderId: "336088132598",
  appId: "1:336088132598:web:9682ce26428d376d24b5d7",
});


export const auth = app.auth();
export default app;
