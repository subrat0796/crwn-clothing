import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
	SignInWithGooglePopup,
	signAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import "./sign-in-form.styles.scss";
// import {} from "../../utils/firebase";

const defaultFormFields = {
	email: "",
	password: "",
};

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);

	const { email, password } = formFields;

	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormFields({ ...formFields, [name]: value });
	};

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const navigateOnSuccessHandler = () => navigate("/shop");

	const signInWithGoogle = async () => {
		try {
			await SignInWithGooglePopup();
			navigateOnSuccessHandler();
			return toast.success("Successfully signed in", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} catch (err) {
			return toast.error("There was an error while Signing in !!", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		try {
			const { user } = await signAuthUserWithEmailAndPassword(email, password);
			resetFormFields();
			navigateOnSuccessHandler();
			return toast.success("Successfully logged in", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} catch (err) {
			if (err.code === "auth/wrong-password" || err) {
				return toast.error("Wrong credentails!", {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			}
		}
	};

	return (
		<div className="sign-in-container">
			<h2>I already have and account</h2>
			<span>Sign in with your email and password</span>

			<form
				onSubmit={() => {
					handleFormSubmit();
				}}
			>
				<FormInput
					label={"Email"}
					type="email"
					required
					onChange={handleChange}
					name="email"
					value={email}
				/>

				<FormInput
					label={"Password"}
					type="password"
					required
					onChange={handleChange}
					name="password"
					value={password}
				/>

				<div className="buttons-container ">
					<Button type="submit" onClick={handleFormSubmit}>
						Sign In
					</Button>
					<Button
						type="button"
						onClick={signInWithGoogle}
						buttonType={BUTTON_TYPE_CLASSES.google}
					>
						Google sign in
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;
