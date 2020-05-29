import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";
import firebaseConfig from "./firebaseConfig";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

// console and devtools will warn about setting timers that are too long.
// seems to be a firebase issue, not in the repo's code
const Firebase = {
  // auth
  loginWithEmail: (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  },
  signupWithEmail: (email, password, displayName) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) =>
        firebase.auth().currentUser.updateProfile({ displayName })
      );
  },
  signOut: () => {
    return firebase.auth().signOut();
  },
  checkUserAuth: (user) => {
    return firebase.auth().onAuthStateChanged(user);
  },
  passwordReset: (email) => {
    return firebase.auth().sendPasswordResetEmail(email);
  },
  retrieveUser: () => {
    return firebase.auth().currentUser;
  },
  // firestore
  createNewUser: (userData) => {
    return firebase
      .firestore()
      .collection("users")
      .doc(`${userData.uid}`)
      .set(userData);
  },
};

export default Firebase;
