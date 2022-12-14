import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { ReactComponent as CrwnLogo } from "../../assets/086 crown.svg";

// import { CartsContext } from "../../contexts/cart.context";
import {
	selectCartItems,
	selectIsCartOpen,
} from "../../features/cart/cartSelector";
import { selectCurrentUser } from "../../features/user/userSelector";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import {
	NavigationContainer,
	LogoContainer,
	NavLinksContainer,
	NavLinks,
} from "./navigation.styles";

const Navigation = () => {
	const currentUser = useSelector(selectCurrentUser);

	const isCartOpen = useSelector(selectIsCartOpen);
	return (
		<Fragment>
			<NavigationContainer>
				<LogoContainer to="/">
					<CrwnLogo />
				</LogoContainer>
				<NavLinksContainer>
					<NavLinks to="/shop">SHOP</NavLinks>
					{currentUser ? (
						<NavLinks as={"span"} onClick={signOutUser}>
							SIGN OUT
						</NavLinks>
					) : (
						<NavLinks to="/auth">SIGN IN</NavLinks>
					)}
					<CartIcon />
				</NavLinksContainer>
				{isCartOpen && <CartDropdown />}
			</NavigationContainer>
			<Outlet />
		</Fragment>
	);
};

export default Navigation;
