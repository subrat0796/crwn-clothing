// import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../features/cart/cartAction";
import { selectCartItems } from "../../features/cart/cartSelector";

// import { CartsContext } from "../../contexts/cart.context";

import { Footer, ProductCardContainer } from "./product-card.styles.jsx";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

const ProductCard = ({ product }) => {
	const { name, price, imageUrl } = product;
	// const { addItemToCart } = useContext(CartsContext);
	const dispatch = useDispatch();
	const cartItems = useSelector(selectCartItems);

	const addProductToCart = () => {
		dispatch(addItemToCart(cartItems, product));
	};

	return (
		<ProductCardContainer>
			<img src={imageUrl} alt={`${name}`} />
			<footer>
				<span className="name">{name}</span>
				<span className="price">{price}</span>
			</footer>
			<Button
				buttonType={BUTTON_TYPE_CLASSES.inverted}
				onClick={addProductToCart}
			>
				Add to card
			</Button>
		</ProductCardContainer>
	);
};

export default ProductCard;
