import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
	isCartOpen: false,
	cartItems: [],
};

const cartSlice = createSlice({
	name: "cart",
	initialState: INITIAL_STATE,
	reducers: {
		SET_IS_CART_OPEN: (state, action) => {
			state.isCartOpen = action.payload;
		},
		SET_CART_ITEMS: (state, action) => {
			state.cartItems = action.payload;
		},
	},
});

const cartActions = cartSlice.actions;

export default cartSlice.reducer;
export { cartActions };
