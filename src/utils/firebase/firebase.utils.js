import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";

import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
	writeBatch,
	query,
	getDocs,
} from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyB908rgE9tDj8aWLk_8JbHbL6I_tQoAaCw",
	authDomain: "crwn-clothing-2-91322.firebaseapp.com",
	projectId: "crwn-clothing-2-91322",
	storageBucket: "crwn-clothing-2-91322.appspot.com",
	messagingSenderId: "646681277538",
	appId: "1:646681277538:web:eee6ec79a760be81a3cd3b",
	measurementId: "G-033VG120XZ",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
	prompt: "select_account",
});

const auth = getAuth();
const db = getFirestore();

// add collections and documents to firestore
const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db);

	objectsToAdd.forEach((element) => {
		const docRef = doc(collectionRef, element.title.toLowerCase());
		batch.set(docRef, element);
	});

	await batch.commit();
	console.log("done");
};

// pull collection from database
const getCatagoriesAndDocuments = async () => {
	const collectionRef = collection(db, "collections");
	const q = query(collectionRef);

	const querySnapshot = await getDocs(q);
	const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
		const { title, items } = docSnapshot.data();
		acc[title.toLowerCase()] = items;
		return acc;
	}, {});

	return categoryMap;
};

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

const signOutUser = async () => await signOut(auth);

const onAuthStateChangedListener = (callback) =>
	onAuthStateChanged(auth, callback);

export {
	auth,
	SignInWithGooglePopup,
	db,
	createUserDocumentFromAuth,
	signInWithGoogleRedirect,
	createAuthUserWithEmailAndPassword,
	signAuthUserWithEmailAndPassword,
	signOutUser,
	onAuthStateChangedListener,
	addCollectionAndDocuments,
	getCatagoriesAndDocuments,
};
