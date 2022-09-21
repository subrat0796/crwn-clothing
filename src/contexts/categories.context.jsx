import { useState, useEffect, createContext } from "react";

import { getCatagoriesAndDocuments } from "../utils/firebase/firebase.utils";

import SHOP_DATA from "../shop-data";

export const CategoriesContext = createContext({
	categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
	// used it only once to set documents in firestore database
	// useEffect(() => {
	// 	addCollectionAndDocuments("catagories", SHOP_DATA);
	// }, []);

	const [categoriesMap, setCategoriesMap] = useState({});
	const value = { categoriesMap };

	useEffect(() => {
		const getCategoriesMap = async () => {
			const categoriesMap = await getCatagoriesAndDocuments();
			setCategoriesMap(categoriesMap);
		};

		getCategoriesMap();
	}, []);

	return (
		<CategoriesContext.Provider value={value}>
			{children}
		</CategoriesContext.Provider>
	);
};
