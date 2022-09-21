import { useContext } from "react";
import { CartsContext } from "../../contexts/cart.context";

import {
	CartIconContainer,
	ItemCountContainer,
	ShoppingIcon,
} from "./cart-icon.styles.jsx";

const CartIcon = () => {
	const { setIsCartOpen, isCartOpen, cartCount } = useContext(CartsContext);

	const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

	return (
		<CartIconContainer onClick={toggleIsCartOpen}>
			<ShoppingIcon className="shopping-icon" />
			<ItemCountContainer>{cartCount}</ItemCountContainer>
		</CartIconContainer>
	);
};

export default CartIcon;
