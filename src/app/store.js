import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import cartReducer from "../features/cart/cartSlice";
import categoriesReducer from "../features/category/categorySlice";
import userReducer from "../features/user/userSlice";

const reducers = combineReducers({
	cart: cartReducer,
	categories: categoriesReducer,
	user: userReducer,
});

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export { store };
export const persistor = persistStore(store);
