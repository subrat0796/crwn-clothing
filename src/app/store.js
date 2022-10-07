import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

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
	blacklist: ["user"],
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
