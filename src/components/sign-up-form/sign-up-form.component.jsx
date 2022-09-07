import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import "./sign-up-form.styles.scss";

const defaultFormFields = {
	displayName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);

	const { displayName, email, password, confirmPassword } = formFields;

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormFields({ ...formFields, [name]: value });
	};

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		if (password !== confirmPassword) {
			alert("Please check passwords");
			return;
		}

		try {
			const { user } = await createAuthUserWithEmailAndPassword(
				email,
				password
			);

			await createUserDocumentFromAuth(user, { displayName });
			resetFormFields();
		} catch (err) {
			if (err.code === "auth/email-already-in-use") {
				alert("Cannot create user , email already exist");
			} else {
				console.log(`Error in creating user account :${err}`);
			}
		}
	};

	return (
		<div className="sign-up-container">
			<h2>Don't have and account?</h2>
			<span>Sign up with your email and password</span>

			<form
				onSubmit={() => {
					handleFormSubmit();
				}}
			>
				<FormInput
					label={"Display Name"}
					type="text"
					required
					onChange={handleChange}
					name="displayName"
					value={displayName}
				/>

				<FormInput
					label="Email"
					type={"email"}
					name="email"
					value={email}
					required
					onChange={handleChange}
				/>

				<FormInput
					label="Password"
					type={"password"}
					name="password"
					value={password}
					required
					onChange={handleChange}
				/>

				<FormInput
					label="Confirm Password"
					type={"password"}
					name="confirmPassword"
					value={confirmPassword}
					required
					onChange={handleChange}
				/>

				<Button type="submit" onClick={handleFormSubmit}>
					Sign Up
				</Button>
			</form>
		</div>
	);
};

export default SignUpForm;
