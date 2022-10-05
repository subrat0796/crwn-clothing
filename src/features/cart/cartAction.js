import { cartActions } from "./cartSlice";

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

export const addItemToCart = (cartItems, productToAdd) => {
	const newCartItems = addCartItem(cartItems, productToAdd);
	return cartActions.SET_CART_ITEMS(newCartItems);
};

export const removeItemFromCart = (cartItems, productToRemove) => {
	const newCartItems = removeCartItem(cartItems, productToRemove);
	return cartActions.SET_CART_ITEMS(newCartItems);
};

export const deleteItemFromCart = (cartItems, productToDelete) => {
	const newCartItems = deleteCartItem(cartItems, productToDelete);
	return cartActions.SET_CART_ITEMS(newCartItems);
};

export const setIsCartOpen = (boolean) => {
	return cartActions.SET_IS_CART_OPEN(boolean);
};
