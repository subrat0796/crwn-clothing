// import { useContext } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { selectCartItems } from "../../features/cart/cartSelector";
// import { CartsContext } from "../../contexts/cart.context";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import {
	CartDropdownContainer,
	CartItemsContainer,
	EmptyMessage,
} from "./cart-dropdown.styles.jsx";

const CartDropdown = () => {
	// const { cartItems } = useContext(CartsContext);
	const cartItems = useSelector(selectCartItems);
	const navigate = useNavigate();

	const goToCheckoutHandler = () => {
		navigate("/checkout");
	};

	return (
		<CartDropdownContainer>
			<CartItemsContainer>
				{cartItems.length ? (
					cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
				) : (
					<EmptyMessage>Your cart is empty</EmptyMessage>
				)}
			</CartItemsContainer>
			<Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
		</CartDropdownContainer>
	);
};
export default CartDropdown;
