import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';


const app = firebase.initializeApp({
  apiKey: "AIzaSyBUU5XsoZkE2sJqa7QjNHuw6LofLK7s7AA",
  authDomain: "auctionnet-fb196.firebaseapp.com",
  projectId: "auctionnet-fb196",
  storageBucket: "auctionnet-fb196.appspot.com",
  messagingSenderId: "85509587385",
  appId: "1:85509587385:web:c8616af2a832d6e4bf7668",
  measurementId: "G-8RFKHKWX4T"
});

export const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export const firestoreApp = app.firestore();
export const storageApp = app.storage();
export const authApp = app.auth();
