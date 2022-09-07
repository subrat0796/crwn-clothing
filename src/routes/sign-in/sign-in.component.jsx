import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import {
	SignInWithGooglePopup,
	createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const signIn = () => {
	const logGoogleUser = async () => {
		const response = await SignInWithGooglePopup();
		// console.log(response);
		const userDocRef = await createUserDocumentFromAuth(response.user);
	};

	return (
		<div>
			<h1>Sign In page</h1>
			<button onClick={logGoogleUser}>Sign in with Google Popup</button>
			<SignUpForm />
		</div>
	);
};

export default signIn;
