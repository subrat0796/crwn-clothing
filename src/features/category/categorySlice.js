import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
	categoriesMap: {},
};

const categorySlice = createSlice({
	name: "category",
	initialState: INITIAL_STATE,
	reducers: {
		SET_CATEGORY_MAP: (state, action) => {
			state.categoriesMap = action.payload;
		},
	},
});

export const categoryActions = categorySlice.actions;
export default categorySlice.reducer;
