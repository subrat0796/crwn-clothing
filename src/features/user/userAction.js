import { userAction } from "./userSlice";

export const setCurrentUser = (user) => {
	return userAction.SET_CURRENT_USER(user);
};
