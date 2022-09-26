import { createContext, useEffect, useReducer } from "react";

import {
	onAuthStateChangedListener,
	createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

// the actual value we would be accessing
export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
	SET_CURRENT_USER: "SET_CURRENT_USER",
};

// user reducer
const UserReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case USER_ACTION_TYPES.SET_CURRENT_USER:
			return {
				...state,
				currentUser: payload,
			};
		default:
			throw new Error(`Invalid type detected ${type} in userReducer`);
	}
};

const INITIAL_STATE = {
	currentUser: null,
};

export const UserProvider = ({ children }) => {
	const [{ currentUser }, dispatch] = useReducer(UserReducer, INITIAL_STATE);
	console.log(currentUser);

	const setCurrentUser = (user) => {
		dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
	};

	const value = { currentUser, setCurrentUser };

	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener((user) => {
			console.log(user);
			if (user) {
				createUserDocumentFromAuth(user);
			}
			setCurrentUser(user);
		});

		return unsubscribe;
	}, []);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
