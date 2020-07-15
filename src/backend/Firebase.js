import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDbGh8-CDP-VHoXtseYvSFuGAwXh_Z8dL8",
  authDomain: "swcollection2187.firebaseapp.com",
  databaseURL: "https://swcollection2187.firebaseio.com",
  projectId: "swcollection2187",
  storageBucket: "swcollection2187.appspot.com",
  messagingSenderId: "659788578698",
  appId: "1:659788578698:web:8e0bbdfb3b87be6db49273"
};

firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export const database = firebase.database();

export default firebase;