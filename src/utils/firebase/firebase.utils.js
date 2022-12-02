import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider 
} from 'firebase/auth';
import { 
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore'



const firebaseConfig = {
  apiKey: "AIzaSyDndFJmxFC0QS5dKYSuyf8u8IVbnS4C2yQ",
  authDomain: "crwn-clothing-db-d7a50.firebaseapp.com",
  projectId: "crwn-clothing-db-d7a50",
  storageBucket: "crwn-clothing-db-d7a50.appspot.com",
  messagingSenderId: "204142409990",
  appId: "1:204142409990:web:132a661c0e3483264f8687"
};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account",
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    console.log(userDocRef);
    console.log(userSnapshot.exists());


    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
            })
        } catch (error) {
            console.log('error creating the user', error.message)
        }
    }

    return userDocRef;
}
