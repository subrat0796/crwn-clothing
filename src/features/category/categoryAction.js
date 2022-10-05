import { categoryActions } from "./categorySlice";

export const setCategoriesMap = (categoriesMap) => {
	return categoryActions.SET_CATEGORY_MAP(categoriesMap);
};
