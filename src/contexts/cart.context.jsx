import { createContext, useState, useEffect } from "react";

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
			? { ...cartItems, quantity: cartItem.quantity - 1 }
			: cartItem
	);
};

export const CartsContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	removeCartItem: () => {},
	deleteCartItem: () => {},
	cartCount: 0,
	totalPrice: 0,
});

export const CartsProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);
	const [totalAmount, setTotalAmount] = useState(0);

	useEffect(() => {
		const newCartTotal = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity,
			0
		);
		const newTotalPrice = cartItems.reduce(
			(total, cartItem) => (total + cartItem.quantity) * cartItem.price,
			0
		);
		setCartCount(newCartTotal);
		setCartCount(newTotalPrice);
	}, [cartItems]);

	const addItemToCart = (productToAdd) => {
		setCartItems(addCartItem(cartItems, productToAdd));
	};

	const value = {
		isCartOpen,
		setIsCartOpen,
		addItemToCart,
		cartItems,
		cartCount,
	};

	return (
		<CartsContext.Provider value={value}>{children}</CartsContext.Provider>
	);
};
