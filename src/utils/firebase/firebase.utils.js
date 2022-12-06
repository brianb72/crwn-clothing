import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
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

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account",
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation = {},
) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            })
        } catch (error) {
            console.log('error creating the user', error.message)
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;    

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;    

    return await signInWithEmailAndPassword(auth, email, password);
}


export const signOutUser = async () => signOut(auth);


export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);
