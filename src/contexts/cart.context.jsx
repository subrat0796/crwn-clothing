import { createContext, useState, useEffect, useReducer } from "react";

const addCartItem = (cartItems, productToAdd) => {
	// find if cartItems contains productToAdd
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === productToAdd.id
	);
	// if found increment quantity
	if (existingCartItem) {
		return cartItems.map((cartItem) =>
			cartItem.id === productToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		);
	}

	return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const deleteCartItem = (cartItems, productToDelete) => {
	return cartItems.filter((cartItem) => cartItem.id !== productToDelete.id);
};

const removeCartItem = (cartItems, productToRemove) => {
	// the cartItem should contain the productToRemove is one or more than 1

	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === productToRemove.id
	);
	if (existingCartItem.quantity === 1) {
		return deleteCartItem(cartItems, productToRemove);
	}

	return cartItems.map((cartItem) =>
		cartItem.id === productToRemove.id
			? { ...cartItem, quantity: cartItem.quantity - 1 }
			: cartItem
	);
};

export const CartsContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	removeItemFromCart: () => {},
	deleteItemFromCart: () => {},
	cartCount: 0,
	totalAmount: 0,
});

const CART_ACTION_TYPES = {
	SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
	SET_CART_ITEMS: "SET_CART_ITEMS",
};

const CartReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case CART_ACTION_TYPES.SET_IS_CART_OPEN:
			return {
				...state,
				isCartOpen: payload,
			};
		case CART_ACTION_TYPES.SET_CART_ITEMS:
			return {
				...state,
				...payload,
			};
		default:
			throw new Error("Invalid cart type detected");
	}
};

const INITIAL_STATE = {
	isCartOpen: false,
	cartItems: [],
	cartCount: 0,
	totalAmount: 0,
};

export const CartsProvider = ({ children }) => {
	const [{ cartItems, cartCount, totalAmount, isCartOpen }, dispatch] =
		useReducer(CartReducer, INITIAL_STATE);

	const updateCartItems = (cartItems) => {
		const newCartTotal = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity,
			0
		);
		const newTotalPrice = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity * cartItem.price,
			0
		);

		dispatch({
			type: CART_ACTION_TYPES.SET_CART_ITEMS,
			payload: {
				cartItems,
				cartCount: newCartTotal,
				totalAmount: newTotalPrice,
			},
		});
	};
	const addItemToCart = (productToAdd) => {
		const newCartItems = addCartItem(cartItems, productToAdd);
		updateCartItems(newCartItems);
	};

	const removeItemFromCart = (productToRemove) => {
		const newCartItems = removeCartItem(cartItems, productToRemove);
		updateCartItems(newCartItems);
	};

	const deleteItemFromCart = (productToDelete) => {
		const newCartItems = deleteCartItem(cartItems, productToDelete);
		updateCartItems(newCartItems);
	};

	const setIsCartOpen = (bool) => {
		dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: bool });
	};

	const value = {
		isCartOpen,
		setIsCartOpen,
		addItemToCart,
		cartItems,
		cartCount,
		totalAmount,
		deleteItemFromCart,
		removeItemFromCart,
	};

	return (
		<CartsContext.Provider value={value}>{children}</CartsContext.Provider>
	);
};
