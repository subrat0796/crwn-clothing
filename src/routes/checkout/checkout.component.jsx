import { useContext } from "react";

import { CartsContext } from "../../contexts/cart.context";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import {
	CheckoutContainer,
	CheckoutHeader,
	HeaderBlock,
	Total,
} from "./checkout.styles.jsx";

const Checkout = () => {
	const { cartItems, totalAmount } = useContext(CartsContext);

	return (
		<CheckoutContainer>
			<CheckoutHeader>
				<HeaderBlock>
					<span>Product</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>Description</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>Quantity</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>Price</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>Remove</span>
				</HeaderBlock>
			</CheckoutHeader>

			{cartItems.map((cartItem) => {
				// const { id, name, quantity } = cartItem;
				return <CheckoutItem key={cartItem.id} cartItem={cartItem} />;
			})}
			<Total>Total : ${totalAmount}</Total>
		</CheckoutContainer>
	);
};

export default Checkout;
