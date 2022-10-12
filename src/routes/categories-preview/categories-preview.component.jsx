import { Fragment } from "react";
import { useSelector } from "react-redux";

// import { CategoriesContext } from "../../contexts/categories.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import Spinner from "../../components/spinner/spinner.component";

import {
	selectCategoriesLoading,
	selectCategoriesMap,
} from "../../features/category/categorySelector";

const CategoriesPreview = () => {
	// const { categoriesMap } = useContext(CategoriesContext);
	const categoriesMap = useSelector(selectCategoriesMap);
	const isLoading = useSelector(selectCategoriesLoading);
	return (
		<Fragment>
			{isLoading ? (
				<Spinner />
			) : (
				Object.keys(categoriesMap).map((title) => {
					const products = categoriesMap[title];

					return (
						<CategoryPreview key={title} title={title} products={products} />
					);
				})
			)}
		</Fragment>
	);
};

export default CategoriesPreview;
