import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
	currentUser: null,
};

const userSlice = createSlice({
	name: "user",
	initialState: INITIAL_STATE,
	reducers: {
		SET_CURRENT_USER: (state, action) => {
			state.currentUser = action.payload;
		},
	},
});

export const userAction = userSlice.actions;
export default userSlice.reducer;
