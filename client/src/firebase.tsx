import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const app = firebase.initializeApp({
   apiKey: "AIzaSyDnLAWljJbujRgS200t82SmRtBFGkCERgw",
  authDomain: "nosh-a16f6.firebaseapp.com",
  projectId: "nosh-a16f6",
  storageBucket: "nosh-a16f6.appspot.com",
  messagingSenderId: "540581022201",
  appId: "1:540581022201:web:96aed621e12d6d18a71528"
});


export const auth = app.auth();
export default app;


// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

/****************** Actual crentials */
// const firebaseConfig = {
//   apiKey: "AIzaSyDnLAWljJbujRgS200t82SmRtBFGkCERgw",
//   authDomain: "nosh-a16f6.firebaseapp.com",
//   projectId: "nosh-a16f6",
//   storageBucket: "nosh-a16f6.appspot.com",
//   messagingSenderId: "540581022201",
//   appId: "1:540581022201:web:96aed621e12d6d18a71528"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);