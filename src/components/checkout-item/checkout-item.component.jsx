import { useContext } from "react";

import { CartsContext } from "../../contexts/cart.context";

import {
	CheckoutItemContainer,
	ImageContainer,
	Quantity,
	RemoveButton,
} from "./checkout-item.styles.jsx";

const CheckoutItem = ({ cartItem }) => {
	const { name, imageUrl, price, quantity } = cartItem;

	const { addItemToCart, deleteItemFromCart, removeItemFromCart } =
		useContext(CartsContext);

	const addItemToCartHandler = () => addItemToCart(cartItem);
	const deleteItemFromCartHandler = () => deleteItemFromCart(cartItem);
	const removeItemFromCartHandler = () => removeItemFromCart(cartItem);

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
