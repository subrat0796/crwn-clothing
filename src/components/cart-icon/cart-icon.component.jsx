import { useContext } from "react";
import { CartsContext } from "../../contexts/cart.context";

import { ReactComponent as ShoppingIcon } from "../../assets/114 shopping-bag.svg";
import "./cart-icon.styles.scss";

const CartIcon = () => {
	const { setIsCartOpen, isCartOpen } = useContext(CartsContext);

	const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

	return (
		<div className="cart-icon-container" onClick={toggleIsCartOpen}>
			<ShoppingIcon className="shopping-icon" />
			<span className="item-count">0</span>
		</div>
	);
};

export default CartIcon;
