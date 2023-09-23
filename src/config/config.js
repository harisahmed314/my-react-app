import { initializeApp } from 'firebase/app';

// Authentication
import { getAuth} from 'firebase/auth';

// Firestore
import { getFirestore } from 'firebase/firestore';

// Storage
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAWcEGY7A3_HpaTb2JxXbv_zcSsVRijyNM",
    authDomain: "ecommerce-6f1c8.firebaseapp.com",
    projectId: "ecommerce-6f1c8",
    storageBucket: "ecommerce-6f1c8.appspot.com",
    messagingSenderId: "666618121963",
    appId: "1:666618121963:web:06cc81eb2cbaee968df8ae",
    measurementId: "G-W3W70681RH"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };