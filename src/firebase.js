import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAS28uwo_yfReZ90q4KSWXQtn86q3-bzVU",
  authDomain: "characters-bc09b.firebaseapp.com",
  databaseURL: "https://characters-bc09b.firebaseio.com",
  projectId: "characters-bc09b",
  storageBucket: "characters-bc09b.appspot.com",
  messagingSenderId: "1025069463016",
  appId: "1:1025069463016:web:0c092129aaee0fa982e05d",
  measurementId: "G-SXPYHWELWF"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const loginWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then(snap => snap.user)
    .catch(console.log);
}

export const signOutGoogle = () => {
  firebase.auth().signOut();
}

