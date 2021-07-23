import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyDCx55Iv-fZjjKceePC88aFZ5oP7uO58sg",
  authDomain: "reactstripe-570d8.firebaseapp.com",
  projectId: "reactstripe-570d8",
  storageBucket: "reactstripe-570d8.appspot.com",
  messagingSenderId: "91327402146",
  appId: "1:91327402146:web:497e74388656404f3747fb"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
export { auth };
export default db;
