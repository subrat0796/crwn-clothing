// import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector.js";

import {
	addItemToCart,
	deleteItemFromCart,
	removeItemFromCart,
} from "../../store/cart/cart.action.js";

// import { CartsContext } from "../../contexts/cart.context";

import {
	CheckoutItemContainer,
	ImageContainer,
	Quantity,
	RemoveButton,
} from "./checkout-item.styles.jsx";

const CheckoutItem = ({ cartItem }) => {
	const dispatch = useDispatch();

	const cartItems = useSelector(selectCartItems);

	const { name, imageUrl, price, quantity } = cartItem;

	// const { addItemToCart, deleteItemFromCart, removeItemFromCart } =
	// 	useContext(CartsContext);

	const addItemToCartHandler = () =>
		dispatch(addItemToCart(cartItems, cartItem));
	const deleteItemFromCartHandler = () =>
		dispatch(deleteItemFromCart(cartItems, cartItem));
	const removeItemFromCartHandler = () =>
		dispatch(removeItemFromCart(cartItems, cartItem));

	return (
		<CheckoutItemContainer>
			<ImageContainer>
				<img src={imageUrl} alt={`${name}`} />
			</ImageContainer>
			<span className="name">{name}</span>
			<Quantity>
				<div className="arrow" onClick={removeItemFromCartHandler}>
					&#10094;
				</div>
				<span className="value">{quantity}</span>
				<div className="arrow" onClick={addItemToCartHandler}>
					&#10095;
				</div>
			</Quantity>
			<span className="price">{price}</span>
			<RemoveButton onClick={deleteItemFromCartHandler}>&#10005;</RemoveButton>
		</CheckoutItemContainer>
	);
};

export default CheckoutItem;
