import { useContext } from "react";

import { CartsContext } from "../../contexts/cart.context";

import { Footer, ProductCardContainer } from "./product-card.styles.jsx";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

const ProductCard = ({ product }) => {
	const { name, price, imageUrl } = product;
	const { addItemToCart } = useContext(CartsContext);

	const addProductToCart = () => {
		addItemToCart(product);
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
