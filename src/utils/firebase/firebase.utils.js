import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
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

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: "select_account",
});

const auth = getAuth();
const db = getFirestore();

const SignInWithGooglePopup = () => {
	return signInWithPopup(auth, provider);
};

const createUserDocumentFromAuth = async (userAuth) => {
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
			});
		} catch (err) {
			console.log(`There was an error creating the user -->${err.message}`);
		}
	}

	return userDocRef;
};

export { auth, SignInWithGooglePopup, db, createUserDocumentFromAuth };
