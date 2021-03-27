import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjW5aTHkgeDK_krcwbGQ_TUlGLmGcBS_w",
  authDomain: "whatsapp-clone-71f38.firebaseapp.com",
  projectId: "whatsapp-clone-71f38",
  storageBucket: "whatsapp-clone-71f38.appspot.com",
  messagingSenderId: "220409485780",
  appId: "1:220409485780:web:401204c4a757ef22829e41",
  measurementId: "G-908X21CEGZ"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
