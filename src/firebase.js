import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBkwnc2NKQI01xtUPe_zFZ6RP7H0ETVngw",
    authDomain: "chat-6594f.firebaseapp.com",
    databaseURL: "https://chat-6594f.firebaseio.com",
    projectId: "chat-6594f",
    storageBucket: "chat-6594f.appspot.com",
    messagingSenderId: "779377648306",
    appId: "1:779377648306:web:cc21e1eba1359c42fe1fab",
    measurementId: "G-QSY489HJK0"
};

const provider = new firebase.auth.GoogleAuthProvider();

// const userRef = firestore.doc(`users/${user.uid}`);
// const snapshot = await userRef.get();



firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
  };

  export const generateUserDocument = async (user, additionalData) => {
    if (!user) return;
    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
      const { email, displayName, photoURL } = user;
      try {
        await userRef.set({
          displayName,
          email,
          photoURL,
          ...additionalData
        });
      } catch (error) {
        console.error("Error creating user document", error);
      }
    }
    return getUserDocument(user.uid);
  };
  const getUserDocument = async uid => {
    if (!uid) return null;
    try {
      const userDocument = await firestore.doc(`users/${uid}`).get();
      return {
        uid,
        ...userDocument.data()
      };
    } catch (error) {
      console.error("Error fetching user", error);
    }
  };