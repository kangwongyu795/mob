import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBCdAMO5VBmk5wBtIUAM7Dbg6RDnSqBaos",
    authDomain: "to-do-list-3672e.firebaseapp.com",
    projectId: "to-do-list-3672e",
    storageBucket: "to-do-list-3672e.appspot.com",
    messagingSenderId: "323038475736",
    appId: "1:323038475736:web:c038aa3b92fe03442a2ead",
    measurementId: "G-MBJ62GTN2C"
};

const app = initializeApp(firebaseConfig);
const dbfire = getFirestore(app);

export default dbfire;