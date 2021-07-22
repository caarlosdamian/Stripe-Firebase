import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyBtJw9C8Da-pXYFRYH-Oa7NPkaPhJF0ujI",
  authDomain: "react-firebase-email-log-640c2.firebaseapp.com",
  projectId: "react-firebase-email-log-640c2",
  storageBucket: "react-firebase-email-log-640c2.appspot.com",
  messagingSenderId: "817497238173",
  appId: "1:817497238173:web:10da0914d3dac257af8274",
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
export { auth };
export default db;
