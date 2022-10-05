// import { useContext } from "react";
import { useSelector } from "react-redux";

import {
	selectCartItems,
	selectCartTotal,
} from "../../features/cart/cartSelector";

// import { CartsContext } from "../../contexts/cart.context";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import {
	CheckoutContainer,
	CheckoutHeader,
	HeaderBlock,
	Total,
} from "./checkout.styles.jsx";

const Checkout = () => {
	// const { cartItems, totalAmount } = useContext(CartsContext);
	const cartItems = useSelector(selectCartItems);
	const totalAmount = useSelector(selectCartTotal);

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
