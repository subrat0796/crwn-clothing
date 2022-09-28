import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ProductCard from "../../components/product-card/product-card.component";

import { CategoryContainer, CategoryTitle } from "./category.styles.jsx";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/category/category.selector";

const Category = () => {
	const { category } = useParams();
	// const { categoriesMap } = useContext(CategoriesContext);
	const categoriesMap = useSelector(selectCategoriesMap);
	// creating a safeguard for data
	const [products, setProducts] = useState(categoriesMap[category]);

	useEffect(() => {
		setProducts(categoriesMap[category]);
	}, [category, categoriesMap]);

	return (
		<>
			<CategoryTitle>{category.toUpperCase()}</CategoryTitle>
			<CategoryContainer>
				{products &&
					products.map((product) => {
						return <ProductCard key={product.id} product={product} />;
					})}
			</CategoryContainer>
		</>
	);
};

export default Category;
