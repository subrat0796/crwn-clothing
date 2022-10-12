import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCatagoriesAndDocuments } from "../../utils/firebase/firebase.utils";

const INITIAL_STATE = {
	categoriesMap: {},
	isLoading: false,
	error: null,
};

export const fetchCategories = createAsyncThunk(
	"category/fetchCategories",
	async () => {
		const response = await getCatagoriesAndDocuments();
		return response;
	}
);

const categorySlice = createSlice({
	name: "category",
	initialState: INITIAL_STATE,
	reducers: {
		SET_CATEGORY_MAP: (state, action) => {
			state.categoriesMap = action.payload;
		},
	},
	extraReducers: (build) => {
		build.addCase(fetchCategories.pending, (state) => {
			state.isLoading = true;
		});
		build.addCase(fetchCategories.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		});
		build.addCase(fetchCategories.fulfilled, (state, action) => {
			state.isLoading = false;
			state.categoriesMap = action.payload;
		});
	},
});

export const categoryActions = categorySlice.actions;
export default categorySlice.reducer;
