import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAHWCCvUOgPJsuwPGFWltIle2sHuW8IZfQ",
	authDomain: "crown-clothing-10143.firebaseapp.com",
	projectId: "crown-clothing-10143",
	storageBucket: "crown-clothing-10143.appspot.com",
	messagingSenderId: "311527336209",
	appId: "1:311527336209:web:4e03af1e11f7a461a504b0",
	measurementId: "G-JZLPCHSBY1",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
	prompt: "select_account",
});

const auth = getAuth();
const db = getFirestore();

// signing in with google popup
const SignInWithGooglePopup = () => {
	return signInWithPopup(auth, googleProvider);
};

// signing in with google redirect
const signInWithGoogleRedirect = () => {
	return signInWithRedirect(auth, googleProvider);
};

// creating user after authentication
const createUserDocumentFromAuth = async (
	userAuth,
	additionalInformation = {}
) => {
	if (!userAuth) return;
	const userDocRef = doc(db, "users", userAuth.uid);

	const userSnapShot = await getDoc(userDocRef);

	if (!userSnapShot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInformation,
			});
		} catch (err) {
			console.log(`There was an error creating the user -->${err.message}`);
		}
	}

	return userDocRef;
};

const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;
	return await createUserWithEmailAndPassword(auth, email, password);
};

const signAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;
	return await signInWithEmailAndPassword(auth, email, password);
};

export {
	auth,
	SignInWithGooglePopup,
	db,
	createUserDocumentFromAuth,
	signInWithGoogleRedirect,
	createAuthUserWithEmailAndPassword,
	signAuthUserWithEmailAndPassword,
};
