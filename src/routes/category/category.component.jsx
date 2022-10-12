import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import ProductCard from "../../components/product-card/product-card.component";
import Spinner from "../../components/spinner/spinner.component";

import { CategoryContainer, CategoryTitle } from "./category.styles.jsx";
import {
	selectCategoriesLoading,
	selectCategoriesMap,
} from "../../features/category/categorySelector";

const Category = () => {
	const { category } = useParams();
	// const { categoriesMap } = useContext(CategoriesContext);
	const categoriesMap = useSelector(selectCategoriesMap);
	// creating a safeguard for data
	const isLoading = useSelector(selectCategoriesLoading);
	const [products, setProducts] = useState(categoriesMap[category]);

	useEffect(() => {
		setProducts(categoriesMap[category]);
	}, [category, categoriesMap]);

	return (
		<>
			<CategoryTitle>{category.toUpperCase()}</CategoryTitle>
			{isLoading ? (
				<Spinner />
			) : (
				<CategoryContainer>
					{products &&
						products.map((product) => {
							return <ProductCard key={product.id} product={product} />;
						})}
				</CategoryContainer>
			)}
		</>
	);
};

export default Category;
