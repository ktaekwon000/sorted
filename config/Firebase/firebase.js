import firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';
import firebaseConfig from './firebaseConfig';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();
export { firebase };

const Firebase = {
  // auth
  loginWithEmail: (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  },
  signupWithEmail: (email, password, displayName) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => firebase.auth().currentUser.updateProfile({ displayName }));
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
    const { FieldValue } = firebase.firestore;
    return firebase
      .firestore()
      .collection('users')
      .doc(`${userData.uid}`)
      .set({ ...userData, createdDate: FieldValue.serverTimestamp() });
  },
  retrieveUserDocument: (userData) => {
    return firebase
      .firestore()
      .collection('users')
      .doc(`${userData.uid}`)
      .get();
  },
  updateNotifiedDate: (userData) => {
    const { FieldValue } = firebase.firestore;
    return firebase
      .firestore()
      .collection('users')
      .doc(`${userData.uid}`)
      .update({ notifiedDate: FieldValue.serverTimestamp() });
  },
  updateUserEmoji: (userData) => (emoji) => {
    return firebase
      .firestore()
      .collection('users')
      .doc(`${userData.uid}`)
      .update({ userEmoji: emoji });
  },
};

export default Firebase;
