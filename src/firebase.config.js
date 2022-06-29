import {getApp, getApps, initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBY9lpI-FkxtMe1z-20jkWYlPgCVF2Q8JA",
    authDomain: "lcwproject-cd6d5.firebaseapp.com",
    databaseURL: "https://lcwproject-cd6d5-default-rtdb.firebaseio.com",
    projectId: "lcwproject-cd6d5",
    storageBucket: "lcwproject-cd6d5.appspot.com",
    messagingSenderId: "1056199383890",
    appId: "1:1056199383890:web:a64cae379d3f6ff2ef388b"
  };
  
  const app = getApps.Length > 0 ? getApp() : initializeApp(firebaseConfig);

  const firestore = getFirestore(app)
  const storage = getStorage(app)

  export {app, firestore, storage};