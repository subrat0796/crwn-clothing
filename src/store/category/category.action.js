import { CATEGORY_ACTION_TYPES } from "./category.types";

export const setCategoriesMap = (categoriesMap) => ({
	type: CATEGORY_ACTION_TYPES.SET_CATEGORY_MAP,
	payload: categoriesMap,
});
