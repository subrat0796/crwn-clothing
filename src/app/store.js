import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "../features/cart/cartSlice";
import categoriesReducer from "../features/category/categorySlice";
import userReducer from "../features/user/userSlice";

const store = configureStore({
	reducer: {
		cart: cartReducer,
		categories: categoriesReducer,
		user: userReducer,
	},
});

export { store };
