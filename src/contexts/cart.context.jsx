import { createContext, useState } from "react";

export const CartsContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
});

export const CartsProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);

	const value = { isCartOpen, setIsCartOpen };

	return (
		<CartsContext.Provider value={value}>{children}</CartsContext.Provider>
	);
};
