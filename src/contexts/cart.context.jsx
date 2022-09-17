import { createContext, useState } from "react";

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

export const CartsContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
});

export const CartsProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);

	const addItemToCart = (productToAdd) => {
		setCartItems(addCartItem(cartItems, productToAdd));
	};

	const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems };

	return (
		<CartsContext.Provider value={value}>{children}</CartsContext.Provider>
	);
};
