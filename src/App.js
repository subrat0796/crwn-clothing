import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
	createUserDocumentFromAuth,
	getCatagoriesAndDocuments,
	onAuthStateChangedListener,
} from "./utils/firebase/firebase.utils";
import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import Authentication from "./routes/authentication/authenticaiton.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { setCurrentUser } from "./store/user/user.action";
import { setCategoriesMap } from "./store/category/category.action";

const App = () => {
	// this never changes , all we do is add dispatch in dependencies to remove liniting error
	const dispatch = useDispatch();

	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener((user) => {
			if (user) {
				createUserDocumentFromAuth(user);
			}
			dispatch(setCurrentUser(user));
		});

		const getCategoriesMap = async () => {
			const categoriesMap = await getCatagoriesAndDocuments();
			dispatch(setCategoriesMap(categoriesMap));
		};

		getCategoriesMap();

		return unsubscribe;
	}, [dispatch]);

	return (
		<Routes>
			<Route path="/" element={<Navigation />}>
				<Route index element={<Home />} />
				<Route path="shop/*" element={<Shop />} />
				<Route path="auth" element={<Authentication />} />
				<Route path="checkout" element={<Checkout />} />
			</Route>
		</Routes>
	);
};

export default App;
