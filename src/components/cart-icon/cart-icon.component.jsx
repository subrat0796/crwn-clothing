import { useDispatch, useSelector } from "react-redux";
// import { CartsContext } from "../../contexts/cart.context";

import {
	selectCartCount,
	selectIsCartOpen,
} from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action";

import {
	CartIconContainer,
	ItemCountContainer,
	ShoppingIcon,
} from "./cart-icon.styles.jsx";

const CartIcon = () => {
	// const { setIsCartOpen, isCartOpen, cartCount } =
	const dispatch = useDispatch();
	const cartCount = useSelector(selectCartCount);
	const isCartOpen = useSelector(selectIsCartOpen);

	const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

	return (
		<CartIconContainer onClick={toggleIsCartOpen}>
			<ShoppingIcon className="shopping-icon" />
			<ItemCountContainer>{cartCount}</ItemCountContainer>
		</CartIconContainer>
	);
};

export default CartIcon;
